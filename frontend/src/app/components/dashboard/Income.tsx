"use client"

import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { useIncome } from "../../../../context/IncomeContext";
import { fetchIncomes } from "../../../api/fetchIncome";

const Income = () => {
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { shouldRefetch } = useIncome();

    useEffect(() => {
        const fetchIncomeData = async () => {
            try {
                const data = await fetchIncomes();
                const total = data.reduce((sum, income) => sum + parseInt(income.amount), 0);
                setTotalIncome(total);
            } catch (err) {
                setError((err as Error).message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchIncomeData();
    }, [shouldRefetch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Income</h1>
                <IoArrowUp className="text-green-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹ {totalIncome.toLocaleString()}</p>
        </div>
    )
}

export default Income
