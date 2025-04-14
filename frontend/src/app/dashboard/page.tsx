"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import Savings from "../components/dashboard/Average";
import Balance from "../components/dashboard/Balance";
import Expense from "../components/dashboard/Expense";
import Income from "../components/dashboard/Income";
import BarGraph from "../components/overview/BarGraph";
import ExpenseBreakdown from "../components/overview/ExpenseBreakdown";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [balanceLoading, setBalanceLoading] = useState(true);
  const [incomeLoading, setIncomeLoading] = useState(true);
  const [expenseLoading, setExpenseLoading] = useState(true);
  const [savingsLoading, setSavingsLoading] = useState(true);
  const [barGraphLoading, setBarGraphLoading] = useState(true);
  const [expenseBreakdownLoading, setExpenseBreakdownLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser?.id || !parsedUser?.name || !parsedUser?.email) {
        throw new Error("Invalid user data");
      }

      setUser(parsedUser);
      setLoading(false);

      fetchAllData(); // Call all API fetches in parallel
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  const fetchBalanceData = async () => {
    setBalanceLoading(false);
  };

  const fetchIncomeData = async () => {
    setIncomeLoading(false);
  };

  const fetchExpenseData = async () => {
    setExpenseLoading(false);
  };

  const fetchSavingsData = async () => {
    setSavingsLoading(false);
  };

  const fetchBarGraphData = async () => {
    setBarGraphLoading(false);
  };

  const fetchExpenseBreakdownData = async () => {
    setExpenseBreakdownLoading(false);
  };

  const fetchAllData = async () => {
    setBalanceLoading(true);
    setIncomeLoading(true);
    setExpenseLoading(true);
    setSavingsLoading(true);
    setBarGraphLoading(true);
    setExpenseBreakdownLoading(true);

    const results = await Promise.allSettled([
      fetchBalanceData(),
      fetchIncomeData(),
      fetchExpenseData(),
      fetchSavingsData(),
      fetchBarGraphData(),
      fetchExpenseBreakdownData()
    ]);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(`API call ${index + 1} failed:`, result.reason);
      }
    });
  };

  const isAllDataLoaded =
    !balanceLoading &&
    !incomeLoading &&
    !expenseLoading &&
    !savingsLoading &&
    !barGraphLoading &&
    !expenseBreakdownLoading;

  if (loading || !user) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!isAllDataLoaded) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Balance />
        <Income />
        <Expense />
        <Savings />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 ml-4">
            Income and Expense Overview (Yearly - {new Date().getFullYear()}):
          </h2>
          <div className="bg-white rounded-lg p-4 h-[300px]">
            <BarGraph />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ml-4">
            Expense Breakdown (Yearly - {new Date().getFullYear()}):
          </h2>
          <div className="bg-white rounded-lg p-4">
            <ExpenseBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
