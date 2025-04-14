import { FaIndianRupeeSign } from "react-icons/fa6";

interface BalanceProps {
    data: number;
    loading: boolean;
    error: Error | null;
}

const Balance: React.FC<BalanceProps> = ({data, loading, error}) => {

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-400">
            <div className="flex justify-between items-center font-semibold">
                <h1 className="text-md text-black">Balance</h1>
                <FaIndianRupeeSign className="text-black" size={18} />
            </div>
            <p className={`text-2xl font-bold ${data >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ₹ {data.toLocaleString()}
            </p>
        </div>
    )
}

export default Balance
