"use client"

import { useEffect, useState } from 'react';
import { useExpense } from '../../../../context/ExpenseContext';
import { useIncome } from '../../../../context/IncomeContext';
import Loading from '../common/Loading';

import { Expense, fetchExpenses } from '../../../api/fetchExpense';
import { fetchIncomes, Income } from '../../../api/fetchIncome';

interface Transaction {
    _id?: string;
    amount: number | string;
    date: string;
    description?: string;
    type: 'income' | 'expense';
    category?: string;
    expended_on?: string;
}

interface TransactionsProps {
    incomeData?: Income[];
    expenseData?: Expense[];
}

const Transactions: React.FC<TransactionsProps> = ({ incomeData, expenseData }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { shouldRefetch: shouldRefetchIncome } = useIncome();
    const { shouldRefetch: shouldRefetchExpense } = useExpense();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let incomeTransactions: Income[];
                let expenseTransactions: Expense[];

                if (incomeData && expenseData) {
                    incomeTransactions = incomeData;
                    expenseTransactions = expenseData;
                } else {
                    [incomeTransactions, expenseTransactions] = await Promise.all([
                        fetchIncomes(),
                        fetchExpenses()
                    ]);
                }

                const allTransactions = [
                    ...incomeTransactions.map(item => ({ ...item, type: 'income' as const })),
                    ...expenseTransactions.map(item => ({ ...item, type: 'expense' as const }))
                ];

                // Sort transactions by date, most recent first
                allTransactions.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime();
                });

                setTransactions(allTransactions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [incomeData, expenseData, shouldRefetchIncome, shouldRefetchExpense]);

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
                                className={`flex justify-between items-center p-2 rounded ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
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
                                <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    ₹{Number(transaction.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
