"use client";

import AddIncome from "@/app/components/modals/AddIncome";
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
import { useState } from "react";
import { FaRegUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../../../../context/AuthContext";
import { useModal } from "../../../../context/ModalContext";
import Logo from "../../../assets/logo.png";

const Navbar = () => {
  const router = useRouter();
  const [openIncomeModal, setOpenIncomeModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  // Modal state
  const { openModal } = useModal();

  const handleOpenIncomeModal = () => {
    setOpenIncomeModal(true);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <div className="flex justify-between items-center">
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
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <>
              <div className="hidden md:flex space-x-2">
                <Button
                  variant="outline"
                  onClick={openModal}
                  className="cursor-pointer"
                >
                  Add Expense
                </Button>
                <Button
                  variant="outline"
                  onClick={handleOpenIncomeModal}
                  className="cursor-pointer"
                >
                  Add Income
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                      <FaRegUserCircle size={24} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="cursor-pointer">
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoggedIn && mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 absolute top-10 right-0 bg-gray-200 shadow-2xl opacity-100 p-4 w-full">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
            Dashboard
          </Link>
          <Link href="/transactions" className="block py-2 px-4 text-gray-600 hover:bg-gray-100" onClick={() => setMobileMenuOpen(false)}>
            Transactions
          </Link>
          <Button
            variant="outline"
            className="w-[40%] text-left justify-start cursor-pointer"
            onClick={() => {
              openModal();
              setMobileMenuOpen(false);
            }}
          >
            Add Expense
          </Button>
          <Button
            variant="outline"
            className="w-[40%] text-left justify-start cursor-pointer"
            onClick={() => {
              handleOpenIncomeModal();
              setMobileMenuOpen(false);
            }}
          >
            Add Income
          </Button>
          <Button
            variant="ghost"
            className="w-[40%] text-left justify-start cursor-pointer"
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
          >
            Logout
          </Button>
        </div>
      )}
      {openIncomeModal && (
        <AddIncome isOpen={openIncomeModal} onClose={() => setOpenIncomeModal(false)} />
      )}
    </nav>
  );
};

export default Navbar;
