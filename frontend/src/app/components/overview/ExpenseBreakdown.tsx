"use client"

import { Progress } from '@/components/ui/progress';
import { useMemo } from 'react';
import { Expense } from '../../../api/fetchExpense';
import { DateRange } from 'react-day-picker';

interface CategoryBreakdown {
    [category: string]: {
        total: number;
        percentage: number;
    }
}

interface ExpenseBreakdownProps {
    expenseData: Expense[];
    loading: boolean;
    dateRange: DateRange | undefined;
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ expenseData, loading, dateRange }) => {
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

    const categoryBreakdown = useMemo(() => {
        const filteredExpenses = expenseData.filter(expense => {
            const expenseDate = new Date(expense.date);
            return (dateRange?.from ? expenseDate >= dateRange.from : true) &&
                   (dateRange?.to ? expenseDate <= dateRange.to : true);
        });
        return calculateCategoryBreakdown(filteredExpenses);
    }, [expenseData, dateRange]);

    if (loading) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    return (
        <div className="space-y-4 border h-[300px] sm:h-[420px] rounded-md py-10 px-6 shadow">
            {Object.entries(categoryBreakdown).map(([category, { total, percentage }]) => (
                <div key={category} className="space-y-2">
                    <div className="flex justify-between font-semibold">
                        <span>{category}</span>
                        <span>₹{Number(total).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <Progress value={percentage} className="w-full" />
                    <span className='text-sm'>{percentage.toFixed(2)}% of total expenses</span>
                </div>
            ))}
        </div>
    )
}

export default ExpenseBreakdown
