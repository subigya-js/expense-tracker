"use client"

import { useEffect, useState } from 'react';
import { LuEqualApproximately } from "react-icons/lu";
import { useIncome } from '../../../../context/IncomeContext';
import { useExpense } from '../../../../context/ExpenseContext';

interface Transaction {
    amount: string;
    date: string;
}

const Average = () => {
    const [averages, setAverages] = useState({ income: 0, expense: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { shouldRefetch: shouldRefetchIncome } = useIncome();
    const { shouldRefetch: shouldRefetchExpense } = useExpense();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found");
                }

                const [incomeResponse, expenseResponse] = await Promise.all([
                    fetch("http://localhost:3001/api/income/", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }),
                    fetch("http://localhost:3001/api/expense/", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                ]);

                if (!incomeResponse.ok || !expenseResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const incomeData: Transaction[] = await incomeResponse.json();
                const expenseData: Transaction[] = await expenseResponse.json();

                const currentYear = new Date().getFullYear();
                const incomeThisYear = incomeData.filter(item => new Date(item.date).getFullYear() === currentYear);
                const expensesThisYear = expenseData.filter(item => new Date(item.date).getFullYear() === currentYear);

                const totalIncome = incomeThisYear.reduce((sum, item) => sum + parseFloat(item.amount), 0);
                const totalExpense = expensesThisYear.reduce((sum, item) => sum + parseFloat(item.amount), 0);

                const averageIncome = totalIncome / 12;
                const averageExpense = totalExpense / 12;

                setAverages({
                    income: Math.round(averageIncome),
                    expense: Math.round(averageExpense)
                });
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [shouldRefetchIncome, shouldRefetchExpense]);

    if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Average (Yearly- 2025):</h1>
                <LuEqualApproximately className="text-black" size={18} />
            </div>
            <div className="flex justify-between">
                <p className="text-green-600 text-md font-semibold">Income: ₹{averages.income.toLocaleString()}</p>
                <p className="text-red-600 text-md font-semibold">Expenses: ₹{averages.expense.toLocaleString()}</p>
            </div>
        </div>
    )
}

export default Average
