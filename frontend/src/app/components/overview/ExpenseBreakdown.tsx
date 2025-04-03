"use client"

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { useExpense } from '../../../../context/ExpenseContext';

interface Expense {
    _id: string;
    user: string;
    expended_on: string;
    category?: string;
    amount: number;
    date: string;
    payment_method: string;
    note: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryBreakdown {
    [category: string]: {
        total: number;
        percentage: number;
    }
}

const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

const ExpenseBreakdown = () => {
    const { shouldRefetch } = useExpense();
    const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown>({});

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/expense/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data: Expense[] = await response.json();
                console.log("Expense data: ", data);

                const breakdown = calculateCategoryBreakdown(data);
                setCategoryBreakdown(breakdown);
            } catch (err) {
                console.error(err);
            }
        }
        fetchExpenseData();
    }, [shouldRefetch])

    const calculateCategoryBreakdown = (expenses: Expense[]): CategoryBreakdown => {
        const breakdown: CategoryBreakdown = {};
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        expenses.forEach(expense => {
            const category = expense.category || 'Others';
            if (!breakdown[category]) {
                breakdown[category] = { total: 0, percentage: 0 };
            }
            breakdown[category].total += expense.amount;
        });

        Object.keys(breakdown).forEach(category => {
            breakdown[category].percentage = (breakdown[category].total / total) * 100;
        });

        return breakdown;
    }

    return (
        <div className="space-y-4 border h-[300px] sm:h-[420px] rounded-md py-10 px-6 shadow">
            {Object.entries(categoryBreakdown).map(([category, { total, percentage }]) => (
                <div key={category} className="space-y-2">
                    <div className="flex justify-between font-semibold">
                        <span>{category}</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <Progress value={percentage} className="w-full" />
                    <span className='text-sm'>{percentage.toFixed(2)}% of total expenses</span>
                </div>
            ))}
        </div>
    )
}

export default ExpenseBreakdown
