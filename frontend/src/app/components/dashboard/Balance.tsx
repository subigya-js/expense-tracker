import { FaIndianRupeeSign } from "react-icons/fa6";

const Balance = () => {
    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Balance</h1>
                <FaIndianRupeeSign className="text-black" size={18} />
            </div>
            <p className="text-black text-2xl font-bold">₹ 1000</p>
        </div>
    )
}

export default Balance
