import { Income as IncomeType } from "@/api/fetchIncome";
import { IoArrowUp } from "react-icons/io5";

import { DateRange } from "react-day-picker";

interface IncomeProps {
    data: IncomeType[];
    loading: boolean;
    error: Error | null;
    dateRange: DateRange | undefined;
}

const Income: React.FC<IncomeProps> = ({ data, loading, error, dateRange }) => {
    const totalIncome = data.reduce((sum, income) => {
        const incomeDate = new Date(income.date);
        if (dateRange?.from && dateRange?.to) {
            if (incomeDate >= dateRange.from && incomeDate <= dateRange.to) {
                return sum + parseInt(income.amount);
            }
        } else if (dateRange?.from) {
            if (incomeDate >= dateRange.from) {
                return sum + parseInt(income.amount);
            }
        } else {
            return sum + parseInt(income.amount);
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
                <h1 className="text-md text-black">Income</h1>
                <IoArrowUp className="text-green-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹{Number(totalIncome.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-500">{dateRangeText}</p>
        </div>
    )
}

export default Income
