"use client"

import { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useExpense } from "../../../../context/ExpenseContext";
import { useIncome } from "../../../../context/IncomeContext";

interface Transaction {
    amount: string;
}

const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

const Balance = () => {
    const [balance, setBalance] = useState<number>(0);
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
                    fetch(`${API_BASE_URL}/api/income/`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }),
                    fetch(`${API_BASE_URL}/api/expense/`, {
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

                const totalIncome = incomeData.reduce((sum, income) => sum + parseFloat(income.amount), 0);
                const totalExpense = expenseData.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

                setBalance(totalIncome - totalExpense);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [shouldRefetchIncome, shouldRefetchExpense]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Balance</h1>
                <FaIndianRupeeSign className="text-black" size={18} />
            </div>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹ {balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
    )
}

export default Balance
