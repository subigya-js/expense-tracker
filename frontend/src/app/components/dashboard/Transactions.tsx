"use client"

import { useEffect, useState } from 'react';
import { useExpense } from '../../../../context/ExpenseContext';
import { useIncome } from '../../../../context/IncomeContext';
import Loading from '../common/Loading';

interface Transaction {
    _id: string;
    amount: number;
    date: string;
    description: string;
    type: 'income' | 'expense';
    category?: string;
    expended_on?: string;
}

const Transactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
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
                    fetch("https://expense-tracker-pi-beryl.vercel.app/api/income/", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }),
                    fetch("https://expense-tracker-pi-beryl.vercel.app/api/expense/", {
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

                const allTransactions = [
                    ...incomeData.map(item => ({ ...item, type: 'income' as const })),
                    ...expenseData.map(item => ({ ...item, type: 'expense' as const }))
                ];

                // Sort transactions by date, most recent first
                allTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setTransactions(allTransactions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [shouldRefetchIncome, shouldRefetchExpense]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (loading) return <div className="flex justify-center items-center min-h-[90vh]"><Loading /></div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-[90vh] p-4 flex flex-col">

            <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
                <div className="flex justify-between items-center font-semibold">
                    <h1 className="text-md text-black">Transactions (Yearly- {new Date().getFullYear()}):</h1>
                </div>
                <div className="flex flex-col space-y-2">
                    {transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className={`flex justify-between items-center p-2 rounded ${
                                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                }`}
                            >
                                <div>
                                    <p className="font-semibold">
                                        {transaction.type === 'income'
                                            ? transaction.category
                                            : transaction.expended_on}
                                    </p>
                                    <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                                </div>
                                <p className={`font-semibold ${
                                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    ₹{transaction.amount.toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No transactions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
