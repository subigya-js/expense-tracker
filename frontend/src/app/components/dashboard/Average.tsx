import { LuEqualApproximately } from "react-icons/lu";

interface AverageProps {
    income: number;
    expense: number;
    loading: boolean;
    error: Error | null;
}

const Average: React.FC<AverageProps> = ({income, expense, loading, error}) => {
    
    if (loading) return <div className="flex justify-center items-center h-full">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Average (Yearly- 2025):</h1>
                <LuEqualApproximately className="text-black" size={18} />
            </div>
            <div className="flex justify-between">
                <p className="text-green-600 text-md font-semibold">Income: ₹{Number(income.toFixed(2)).toLocaleString("en-IN")}</p>
                <p className="text-red-600 text-md font-semibold">Expenses: ₹{Number(expense.toFixed(2)).toLocaleString("en-IN")}</p>
            </div>
        </div>
    )
}

export default Average
