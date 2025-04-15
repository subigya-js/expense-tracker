"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useIncome } from "../../../context/IncomeContext";
import { useExpense } from "../../../context/ExpenseContext";
import Loading from "../components/common/Loading";
import Average from "../components/dashboard/Average";
import Balance from "../components/dashboard/Balance";
import Expense from "../components/dashboard/Expense";
import Income from "../components/dashboard/Income";
import BarGraph from "../components/overview/BarGraph";
import ExpenseBreakdown from "../components/overview/ExpenseBreakdown";

import { Expense as ExpenseType, fetchExpenses } from "@/api/fetchExpense";
import { Income as IncomeType, fetchIncomes } from "@/api/fetchIncome";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [incomeData, setIncomeData] = useState<IncomeType[]>([]);
  const [incomeLoading, setIncomeLoading] = useState(true);
  const [incomeError, setIncomeError] = useState<Error | null>(null);

  const [expenseData, setExpenseData] = useState<ExpenseType[]>([]);
  const [expenseLoading, setExpenseLoading] = useState(true);
  const [expenseError, setExpenseError] = useState<Error | null>(null);

  const [balanceData, setBalanceData] = useState<number>(0);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState<Error | null>(null);

  const [averageIncome, setAverageIncome] = useState<number>(0);
  const [averageExpense, setAverageExpense] = useState<number>(0);
  const [averageError, setAverageError] = useState<Error | null>(null);
  const [averageLoading, setAverageLoading] = useState(true);

  // const [barGraphLoading, setBarGraphLoading] = useState(true);
  // const [expenseBreakdownLoading, setExpenseBreakdownLoading] = useState(true);

  const { shouldRefetch: shouldRefetchIncome } = useIncome();
  const { shouldRefetch: shouldRefetchExpense } = useExpense();

  const router = useRouter();

  // Income
  useEffect(() => {
    const fetchIncomeData = async () => {
      setIncomeLoading(true);
      try {
        const data = await fetchIncomes()
        setIncomeData(data)
      }
      catch (error) {
        setIncomeError(error instanceof Error ? error : new Error('An unknown error occurred'));
      }
      finally {
        setIncomeLoading(false);
      }
    }

    fetchIncomeData()
  }, [shouldRefetchIncome])

  // Expense
  useEffect(() => {
    const fetchExpenseData = async () => {
      setExpenseLoading(true)

      try {
        const data = await fetchExpenses()
        setExpenseData(data)
      }
      catch (error) {
        setExpenseError(error instanceof Error ? error : new Error('An unknown error occurred'));
      }
      finally {
        setExpenseLoading(false);
      }
    }

    fetchExpenseData()
  }, [shouldRefetchExpense])

  // Balance and Average
  useEffect(() => {
    const calculateData = async () => {
      setBalanceLoading(true);
      setAverageLoading(true);

      try {
        if (incomeData.length === 0 || expenseData.length === 0) {
          // Data not yet loaded, exit early
          return;
        }

        const parseAmount = (amount: string) => {
          const parsed = parseFloat(amount);
          return isNaN(parsed) ? 0 : parsed;
        };

        const totalIncome = incomeData.reduce((sum, income) => sum + parseAmount(income.amount), 0);
        const totalExpense = expenseData.reduce((sum, expense) => sum + parseAmount(expense.amount), 0);

        // Calculate balance
        const balance = totalIncome - totalExpense;
        setBalanceData(balance);

        // Calculate averages
        const currentYear = new Date().getFullYear();
        const incomeThisYear = incomeData.filter(item => new Date(item.date).getFullYear() === currentYear);
        const expensesThisYear = expenseData.filter(item => new Date(item.date).getFullYear() === currentYear);

        const totalIncomeThisYear = incomeThisYear.reduce((sum, item) => sum + parseAmount(item.amount), 0);
        const totalExpenseThisYear = expensesThisYear.reduce((sum, item) => sum + parseAmount(item.amount), 0);

        setAverageIncome(totalIncomeThisYear / 12);
        setAverageExpense(totalExpenseThisYear / 12);

      } catch (error) {
        setBalanceError(error instanceof Error ? error : new Error('An unknown error occurred'));
        setAverageError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setBalanceLoading(false);
        setAverageLoading(false);
      }
    };

    calculateData();
  }, [incomeData, expenseData]);


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

      // fetchAllData(); // Call all API fetches in parallel
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    }
  }, [router]);

  // const fetchAllData = async () => {
  //   const results = await Promise.allSettled([
  //     fetchBarGraphData(),
  //     fetchExpenseBreakdownData()
  //   ]);

  //   results.forEach((result, index) => {
  //     if (result.status === "rejected") {
  //       console.error(`API call ${index + 1} failed:`, result.reason);
  //     }
  //   });
  // };

  // const fetchBarGraphData = async () => {
  //   setBarGraphLoading(false);
  // };

  // const fetchExpenseBreakdownData = async () => {
  //   setExpenseBreakdownLoading(false);
  // };

  // const isAllDataLoaded =
  //   !balanceLoading &&
  //   !incomeLoading &&
  //   !expenseLoading &&
  //   !averageLoading &&
  //   !barGraphLoading &&
  //   !expenseBreakdownLoading;

  // console.log(isAllDataLoaded)

  if (loading || !user || incomeLoading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] p-4 flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Balance data={balanceData} loading={balanceLoading} error={balanceError} />
        <Income data={incomeData} loading={incomeLoading} error={incomeError} />
        <Expense data={expenseData} loading={expenseLoading} error={expenseError} />
        <Average income={averageIncome} expense={averageExpense} loading={averageLoading} error={averageError} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 ml-4">
            Income and Expense Overview (Yearly - {new Date().getFullYear()}):
          </h2>
          <div className="bg-white rounded-lg p-4 h-[300px]">
            <BarGraph incomeData={incomeData} expenseData={expenseData} loading={incomeLoading || expenseLoading} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ml-4">
            Expense Breakdown (Yearly - {new Date().getFullYear()}):
          </h2>
          <div className="bg-white rounded-lg p-4">
            <ExpenseBreakdown expenseData={expenseData} loading={expenseLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
