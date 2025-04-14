import { Income as IncomeType } from "@/api/fetchIncome";
import { IoArrowUp } from "react-icons/io5";

interface IncomeProps {
    data: IncomeType[];
    loading: boolean;
    error: Error | null;
  }

const Income: React.FC<IncomeProps> = ({ data, loading, error }) => {
    const totalIncome = data.reduce((sum, income) => sum + parseInt(income.amount), 0);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Income</h1>
                <IoArrowUp className="text-green-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹ {totalIncome.toFixed(2).toLocaleString()}</p>
        </div>
    )
}

export default Income
