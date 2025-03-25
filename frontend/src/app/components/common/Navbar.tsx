"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useModal } from "../../../../context/ModalContext";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Modal state
  const {openModal} = useModal();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 flex items-center space-x-2"
          >
            <Image src={Logo} alt="Logo" width={32} height={32} />
            <span>Expense Tracker</span>
          </Link>
          {isLoggedIn && (
            <div className="hidden md:flex space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-800"
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="text-gray-600 hover:text-gray-800"
              >
                Transactions
              </Link>
              <Link
                href="/reports"
                className="text-gray-600 hover:text-gray-800"
              >
                Reports
              </Link>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <Button variant="outline" className="hidden md:inline-flex" onClick={openModal}>
                Add Expense
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <FaRegUserCircle size={24} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
