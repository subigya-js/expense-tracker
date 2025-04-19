"use client";

import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { useExpense } from "../../../context/ExpenseContext";
import { useIncome } from "../../../context/IncomeContext";
import Loading from "../components/common/Loading";
import Average from "../components/dashboard/Average";
import Balance from "../components/dashboard/Balance";
import Expense from "../components/dashboard/Expense";
import Income from "../components/dashboard/Income";
import BarGraph from "../components/overview/BarGraph";
import ExpenseBreakdown from "../components/overview/ExpenseBreakdown";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Expense as ExpenseType, fetchExpenses } from "@/api/fetchExpense";
import { Income as IncomeType, fetchIncomes } from "@/api/fetchIncome";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showRangeNotification, setShowRangeNotification] = useState(false);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setShowRangeNotification(!!range?.from && !range?.to);
  };

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { shouldRefetch: shouldRefetchIncome } = useIncome();
  const { shouldRefetch: shouldRefetchExpense } = useExpense();

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2021 }, (_, i) => currentYear - i);
  }, []);

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

  // Filter and calculate data based on date range
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

        const filterByDateRange = (item: { date: string }) => {
          const itemDate = new Date(item.date);
          if (dateRange?.from && dateRange?.to) {
            return itemDate >= dateRange.from && itemDate <= dateRange.to;
          } else if (dateRange?.from) {
            return itemDate >= dateRange.from;
          }
          return true; // If no date range is selected, include all items
        };

        const filteredIncomeData = incomeData.filter(filterByDateRange);
        const filteredExpenseData = expenseData.filter(filterByDateRange);

        const totalIncome = filteredIncomeData.reduce((sum, income) => sum + parseAmount(income.amount), 0);
        const totalExpense = filteredExpenseData.reduce((sum, expense) => sum + parseAmount(expense.amount), 0);

        // Calculate balance
        const balance = totalIncome - totalExpense;
        setBalanceData(balance);

        // Calculate averages
        const dayCount = dateRange?.to
          ? Math.ceil((dateRange.to.getTime() - (dateRange.from?.getTime() || Date.now())) / (1000 * 3600 * 24)) + 1
          : 30; // Default to 30 days if no end date

        setAverageIncome(totalIncome / dayCount);
        setAverageExpense(totalExpense / dayCount);

      } catch (error) {
        setBalanceError(error instanceof Error ? error : new Error('An unknown error occurred'));
        setAverageError(error instanceof Error ? error : new Error('An unknown error occurred'));
      } finally {
        setBalanceLoading(false);
        setAverageLoading(false);
      }
    };

    calculateData();
  }, [incomeData, expenseData, dateRange]);


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

  if (loading || !user || incomeLoading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  console.log("Date range: ", dateRange)

  return (
    <div className="min-h-[90vh] p-4 flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-sm cursor-pointer" variant={"default"}>
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {dateRange.from.toDateString()} - {dateRange.to.toDateString()}
                    </>
                  ) : (
                    dateRange.from.toDateString()
                  )
                ) : (
                  "Select Date Range"
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-auto p-4" title="Select Date Range">
              {showRangeNotification && (
                <p className="text-red-500 mt-2">Please select an end date for the range</p>
              )}
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                className="rounded-md border"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Balance data={balanceData} loading={balanceLoading} error={balanceError} dateRange={dateRange} />
        <Income data={incomeData} loading={incomeLoading} error={incomeError} dateRange={dateRange} />
        <Expense data={expenseData} loading={expenseLoading} error={expenseError} dateRange={dateRange} />
        <Average income={averageIncome} expense={averageExpense} loading={averageLoading} error={averageError} dateRange={dateRange} />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between items-center mb-4 ml-4">
            <h2 className="text-xl font-semibold">
              Income and Expense Overview (Yearly):
            </h2>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger className="w-[130px] cursor-pointer">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()} className="cursor-pointer">{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="bg-white rounded-lg p-4 h-[300px]">
            <BarGraph incomeData={incomeData} expenseData={expenseData} loading={incomeLoading || expenseLoading} selectedYear={selectedYear} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 ml-4">
            Expense Breakdown ({dateRange?.from && dateRange?.to
              ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
              : dateRange?.from
              ? dateRange.from.toLocaleDateString()
              : 'All time'}):
          </h2>
          <div className="bg-white rounded-lg p-4">
            <ExpenseBreakdown expenseData={expenseData} loading={expenseLoading} dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
