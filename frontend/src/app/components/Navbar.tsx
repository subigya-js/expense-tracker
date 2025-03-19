import Link from 'next/link'
import { FaRegUserCircle } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logo from "../../assets/logo.png"
import Image from 'next/image'

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-8 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                    <Link href="/" className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                        <Image src={Logo} alt="Logo" width={32} height={32} />
                        <span>Expense Tracker</span>
                    </Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/dashboard" className="text-gray-600 hover:text-gray-800">
                            Dashboard
                        </Link>
                        <Link href="/transactions" className="text-gray-600 hover:text-gray-800">
                            Transactions
                        </Link>
                        <Link href="/reports" className="text-gray-600 hover:text-gray-800">
                            Reports
                        </Link>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="hidden md:inline-flex">
                        Add Expense
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <FaRegUserCircle size={24} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
