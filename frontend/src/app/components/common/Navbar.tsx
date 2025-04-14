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
                >
                  Add Expense
                </Button>
                <Button
                  variant="outline"
                  onClick={handleOpenIncomeModal}
                >
                  Add Income
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
              </div>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {isLoggedIn && mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link href="/dashboard" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">
            Dashboard
          </Link>
          <Link href="/transactions" className="block py-2 px-4 text-gray-600 hover:bg-gray-100">
            Transactions
          </Link>
          <Button
            variant="outline"
            className="w-full text-left justify-start"
            onClick={() => {
              openModal();
              setMobileMenuOpen(false);
            }}
          >
            Add Expense
          </Button>
          <Button
            variant="outline"
            className="w-full text-left justify-start"
            onClick={() => {
              handleOpenIncomeModal();
              setMobileMenuOpen(false);
            }}
          >
            Add Income
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left justify-start"
            onClick={() => {
              router.push("/dashboard");
              setMobileMenuOpen(false);
            }}
          >
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left justify-start"
            onClick={() => {
              // Handle settings
              setMobileMenuOpen(false);
            }}
          >
            Settings
          </Button>
          <Button
            variant="ghost"
            className="w-full text-left justify-start"
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
