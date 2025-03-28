"use client"

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { useExpense } from '../../../../context/ExpenseContext';
import { useIncome } from '../../../../context/IncomeContext';

interface Transaction {
    amount: string;
    date: string;
}

interface ChartData {
    month: string;
    income: number;
    expense: number;
}

const BarGraph = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
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

                const processedData = processTransactions(incomeData, expenseData);
                setChartData(processedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [shouldRefetchIncome, shouldRefetchExpense]);

const processTransactions = (incomeData: Transaction[], expenseData: Transaction[]): ChartData[] => {
    const monthlyData: { [key: string]: ChartData } = {};
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Initialize data for all months of 2025
    months.forEach((month) => {
        monthlyData[month] = { month, income: 0, expense: 0 };
    });

    const processTransaction = (transaction: Transaction, isIncome: boolean) => {
        const date = new Date(transaction.date);
        if (date.getFullYear() !== 2025) return; // Only process 2025 data

        const month = date.toLocaleString('default', { month: 'long' });
        const amount = parseFloat(transaction.amount);

        if (isIncome) {
            monthlyData[month].income += amount;
        } else {
            monthlyData[month].expense += amount;
        }
    };

    incomeData.forEach(transaction => processTransaction(transaction, true));
    expenseData.forEach(transaction => processTransaction(transaction, false));

    return months.map(month => monthlyData[month]);
};

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartConfig: ChartConfig = {
        income: {
            label: "Income",
            color: "#4CAF50",
        },
        expense: {
            label: "Expense",
            color: "#f5291b",
        },
    };

    return (
        <div className="w-full h-[300px] sm:h-[420px] p-4 bg-white rounded-lg shadow">
            <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis 
                            dataKey="month" 
                            tick={{fontSize: 12}}
                            tickFormatter={(value) => value.substring(0, 3)}
                        />
                        <YAxis 
                            tick={{fontSize: 12}}
                            tickFormatter={(value) => `₹${value / 1000}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{fontSize: 12}} />
                        <Bar dataKey="income" fill="#4CAF50" name="Income" barSize={30}/>
                        <Bar dataKey="expense" fill="#f5291b" name="Expense" barSize={30}/>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const income = payload[0]?.value || 0;
        const expense = payload[1]?.value || 0;
        const balance = income - expense;
        return (
            <div className="bg-white p-2 border border-gray-300 rounded shadow">
                <p className="font-bold">{label}</p>
                <p className="text-green-600">Income: ₹{income.toLocaleString()}</p>
                <p className="text-red-600">Expense: ₹{expense.toLocaleString()}</p>
                <p className={`font-semibold text-blue-600`}>
                    Balance: ₹{balance.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export default BarGraph;
