"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { Income } from '../../../api/fetchIncome';
import { Expense } from '../../../api/fetchExpense';

interface ChartData {
    month: string;
    income: number;
    expense: number;
}

interface BarGraphProps {
    incomeData: Income[];
    expenseData: Expense[];
    loading: boolean;
    selectedYear: number;
}

const BarGraph: React.FC<BarGraphProps> = ({ incomeData, expenseData, loading, selectedYear }) => {

    const processTransactions = (incomeData: Income[], expenseData: Expense[], year: number): ChartData[] => {
        const monthlyData: { [key: string]: ChartData } = {};
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        months.forEach((month) => {
            monthlyData[month] = { month, income: 0, expense: 0 };
        });

        const processTransaction = (transaction: Income | Expense, isIncome: boolean) => {
            const date = new Date(transaction.date);
            if (date.getFullYear() !== year) return;

            const month = months[date.getMonth()];
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

    const chartData = useMemo(() => processTransactions(incomeData, expenseData, selectedYear), [incomeData, expenseData, selectedYear]);

    if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;

    return (
        <div className="w-full border h-[300px] sm:h-[420px] flex flex-col p-4 bg-white rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="income" fill="#4CAF50" name="Income" />
                    <Bar dataKey="expense" fill="#f5291b" name="Expense" />
                </BarChart>
            </ResponsiveContainer>
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
                <p className="text-green-600">Income: ₹{Number(income.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className="text-red-600">Expense: ₹{Number(expense.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p className={`font-semibold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    Balance: ₹{Number(balance.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
            </div>
        );
    }
    return null;
};

export default BarGraph;
