import { CiTimer } from "react-icons/ci";

const Savings = () => {
    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-gray-300">Savings</h1>
                <CiTimer className="text-gray-300" size={18} />
            </div>
            <p className="text-gray-300 text-xl font-semibold italic">Coming Soon</p>
        </div>
    )
}

export default Savings
