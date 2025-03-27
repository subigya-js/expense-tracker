import { IoArrowDown } from "react-icons/io5";

const Expense = () => {
    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Expense</h1>
                <IoArrowDown className="text-red-500" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹ 1000</p>
        </div>
    )
}

export default Expense
