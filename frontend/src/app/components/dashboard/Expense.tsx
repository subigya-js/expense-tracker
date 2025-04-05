import { useEffect, useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import { useExpense } from "../../../../context/ExpenseContext";
import { fetchExpenses } from "../../../api/fetchExpense";

const Expense = () => {
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { shouldRefetch } = useExpense();

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const data = await fetchExpenses();
                const total = data.reduce((sum, expense) => sum + parseInt(expense.amount), 0);
                setTotalExpense(total);
            } catch (err) {
                setError((err as Error).message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchExpenseData();
    }, [shouldRefetch])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Expense</h1>
                <IoArrowDown className="text-red-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹ {totalExpense.toLocaleString()}</p>
        </div>
    )
}

export default Expense
