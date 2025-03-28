import { LuEqualApproximately } from "react-icons/lu";

const Average = () => {
    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Average:</h1>
                <LuEqualApproximately className="text-black" size={18} />
            </div>
            <div className="flex justify-between">
                <p className="text-green-600 text-md font-semibold">Income: 40000</p>
                <p className="text-red-600 text-md font-semibold">Expenses: 25000</p>
            </div>
        </div>
    )
}

export default Average
