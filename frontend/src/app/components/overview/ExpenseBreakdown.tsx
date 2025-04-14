"use client"

import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { useExpense } from '../../../../context/ExpenseContext';
import { fetchExpenses, Expense } from '../../../api/fetchExpense';

interface CategoryBreakdown {
    [category: string]: {
        total: number;
        percentage: number;
    }
}

const ExpenseBreakdown = () => {
    const { shouldRefetch } = useExpense();
    const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown>({});

    useEffect(() => {
        const loadExpenseData = async () => {
            try {
                const data = await fetchExpenses();

                const breakdown = calculateCategoryBreakdown(data);
                setCategoryBreakdown(breakdown);
            } catch (err) {
                console.error(err);
            }
        }
        loadExpenseData();
    }, [shouldRefetch])

    const calculateCategoryBreakdown = (expenses: Expense[]): CategoryBreakdown => {
        const breakdown: CategoryBreakdown = {};
        const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

        expenses.forEach(expense => {
            const category = expense.category || 'Others';
            if (!breakdown[category]) {
                breakdown[category] = { total: 0, percentage: 0 };
            }
            breakdown[category].total += parseFloat(expense.amount);
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
