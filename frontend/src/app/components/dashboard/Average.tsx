import { LuEqualApproximately } from "react-icons/lu";
import { DateRange } from "react-day-picker";

interface AverageProps {
    income: number;
    expense: number;
    loading: boolean;
    error: Error | null;
    dateRange: DateRange | undefined;
}

const Average: React.FC<AverageProps> = ({ income, expense, loading, error, dateRange }) => {

    if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    const dateRangeText = dateRange?.from && dateRange?.to
        ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
        : dateRange?.from
        ? `From ${dateRange.from.toLocaleDateString()}`
        : 'All time';

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Average</h1>
                <LuEqualApproximately className="text-black" size={18} />
            </div>
            <div className="flex justify-between">
                <p className="text-green-600 text-md font-semibold">Income: ₹{Number(income.toFixed(2)).toLocaleString("en-IN")}</p>
                <p className="text-red-600 text-md font-semibold">Expense: ₹{Number(expense.toFixed(2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            <p className="text-sm text-gray-500">{dateRangeText}</p>
        </div>
    )
}

export default Average
