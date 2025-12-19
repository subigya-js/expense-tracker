"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import Average from "../../components/dashboard/Average";
import Balance from "../../components/dashboard/Balance";
import Expense from "../../components/dashboard/Expense";
import Income from "../../components/dashboard/Income";
import BarGraph from "../../components/overview/BarGraph";
import ExpenseBreakdown from "../../components/overview/ExpenseBreakdown";

interface Transaction {
    amount: string;
    date: string;
    category?: string;
    expended_on?: string;
}

interface DashboardProps {
    incomeData: Transaction[];
    expenseData: Transaction[];
}

export default function DashboardClient({ incomeData, expenseData }: DashboardProps) {
    const [dateRange, setDateRange] = useState<DateRange>();
    const [showRangeNotification, setShowRangeNotification] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 2021 }, (_, i) => currentYear - i);
    }, []);

    const filtered = useMemo(() => {
        const inRange = (date: string) => {
            const d = new Date(date);
            if (dateRange?.from && dateRange?.to) return d >= dateRange.from && d <= dateRange.to;
            if (dateRange?.from) return d >= dateRange.from;
            return true;
        };

        const income = incomeData.filter((i) => inRange(i.date));
        const expense = expenseData.filter((e) => inRange(e.date));

        const totalIncome = income.reduce((s: number, i) => s + Number(i.amount), 0);
        const totalExpense = expense.reduce((s: number, e) => s + Number(e.amount), 0);

        const days =
            dateRange?.from && dateRange?.to
                ? Math.max(
                    1,
                    Math.ceil(
                        (dateRange.to.getTime() - dateRange.from.getTime()) /
                        (1000 * 3600 * 24)
                    )
                )
                : 30;

        return {
            income,
            expense,
            balance: totalIncome - totalExpense,
            avgIncome: totalIncome / days,
            avgExpense: totalExpense / days,
        };
    }, [incomeData, expenseData, dateRange]);

    return (
        <div className="min-h-[90vh] p-4 flex flex-col gap-5">
            <div className="flex justify-between flex-col sm:flex-row">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            {dateRange?.from
                                ? dateRange.to
                                    ? `${dateRange.from.toDateString()} - ${dateRange.to.toDateString()}`
                                    : dateRange.from.toDateString()
                                : "Select Date Range"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent title="Select Date Range">
                        {showRangeNotification && (
                            <p className="text-red-500">Please select an end date</p>
                        )}
                        <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={(range) => {
                                setDateRange(range);
                                setShowRangeNotification(!!range?.from && !range?.to);
                            }}
                            numberOfMonths={2}
                        />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <Balance data={filtered.balance} loading={false} error={null} dateRange={dateRange} />
                <Income data={filtered.income} loading={false} error={null} dateRange={dateRange} />
                <Expense data={filtered.expense} loading={false} error={null} dateRange={dateRange} />
                <Average
                    income={filtered.avgIncome}
                    expense={filtered.avgExpense}
                    loading={false}
                    error={null}
                    dateRange={dateRange}
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div>
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">Yearly Overview</h2>
                        <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(Number(v))}>
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map(y => (
                                    <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <BarGraph
                        incomeData={incomeData}
                        expenseData={expenseData}
                        loading={false}
                        selectedYear={selectedYear}
                    />
                </div>

                <ExpenseBreakdown
                    expenseData={filtered.expense}
                    loading={false}
                    dateRange={dateRange}
                />
            </div>
        </div>
    );
}
