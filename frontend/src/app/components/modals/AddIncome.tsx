import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from 'react';
import { useIncome } from "../../../../context/IncomeContext";

interface AddIncomeProps {
    isOpen: boolean;
    onClose: () => void;
}

const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

const AddIncome: React.FC<AddIncomeProps> = ({ isOpen, onClose }) => {
    const initialIncomeState = {
        amount: '' as number | '',
        category: '',
        date: '',
        description: ''
    };
    const [income, setIncome] = useState(initialIncomeState);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { triggerRefetch } = useIncome();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You need to be logged in to add an income.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/income/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(income)
            })

            if (!response.ok) {
                throw new Error("Failed to add income.");
            }

            const data = await response.json();
            console.log("Income added:", data);
            triggerRefetch();
            setIncome(initialIncomeState);
            onClose();
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]" title="Add Income">
                <DialogHeader>
                    <DialogTitle>Add Income</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={income.amount}
                            onChange={(e) => setIncome({ ...income, amount: e.target.value ? Number(e.target.value) : '' })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            required
                            min="1"
                            step="1"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category <span className="text-red-500">*</span>
                        </label>
                        <Select value={income.category} onValueChange={(value) => setIncome({ ...income, category: value })}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Salary">Salary</SelectItem>
                                <SelectItem value="Freelance">Freelance</SelectItem>
                                <SelectItem value="Investment">Investment</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={income.date}
                            onChange={(e) => setIncome({ ...income, date: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            type='text'
                            id="description"
                            value={income.description}
                            onChange={(e) => setIncome({ ...income, description: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:italic"
                        ></input>
                    </div>
                    <p>{error && error}</p>
                    <Button type="submit">{isLoading ? "Adding Income" : "Add Income"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddIncome;
