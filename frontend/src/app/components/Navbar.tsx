import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center py-6 px-8 min-h-[10vh] bg-gray-300 text-gray-700">
            <p className="font-semibold">Expense Tracker</p>
            <button><FaRegUserCircle size={24}/></button>
        </div>
    )
}

export default Navbar