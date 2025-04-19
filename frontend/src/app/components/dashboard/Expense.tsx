"use client"

import { Expense as ExpenseType } from "@/api/fetchExpense";
import { IoArrowDown } from "react-icons/io5";
import { DateRange } from "react-day-picker";

interface ExpenseProps {
    data: ExpenseType[];
    loading: boolean;
    error: Error | null;
    dateRange: DateRange | undefined;
}

const Expense: React.FC<ExpenseProps> = ({ data, loading, error, dateRange }) => {
    const totalExpense = data.reduce((sum, expense) => {
        const expenseDate = new Date(expense.date);
        if (dateRange?.from && dateRange?.to) {
            if (expenseDate >= dateRange.from && expenseDate <= dateRange.to) {
                return sum + parseInt(expense.amount);
            }
        } else if (dateRange?.from) {
            if (expenseDate >= dateRange.from) {
                return sum + parseInt(expense.amount);
            }
        } else {
            return sum + parseInt(expense.amount);
        }
        return sum;
    }, 0);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const dateRangeText = dateRange?.from && dateRange?.to
        ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
        : dateRange?.from
        ? `From ${dateRange.from.toLocaleDateString()}`
        : 'All time';

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Expense</h1>
                <IoArrowDown className="text-red-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹{Number(totalExpense.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500">{dateRangeText}</p>
        </div>
    )
}

export default Expense
