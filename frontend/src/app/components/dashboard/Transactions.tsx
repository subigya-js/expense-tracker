"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import * as XLSX from "xlsx";

interface Transaction {
    _id?: string;
    amount: number | string;
    date: string;
    type: "income" | "expense";
    category?: string;
    expended_on?: string;
    description?: string;
}

export default function TransactionsClient({
    transactions,
}: {
    transactions: Transaction[];
}) {
    const [dateRange, setDateRange] = useState<DateRange>();
    const [showRangeNotification, setShowRangeNotification] = useState(false);

    const filteredTransactions = useMemo(() => {
        if (!dateRange?.from) return transactions;

        return transactions.filter((t) => {
            const d = new Date(t.date);
            if (dateRange.to) return d >= dateRange.from! && d <= dateRange.to;
            return d >= dateRange.from!;
        });
    }, [transactions, dateRange]);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    const exportToExcel = () => {
        const data = filteredTransactions.map((t) => ({
            Type: t.type,
            Category: t.type === "income" ? t.category : t.expended_on,
            Amount: Number(t.amount),
            Date: formatDate(t.date),
            Description: t.description || "",
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");

        XLSX.writeFile(wb, "transactions.xlsx");
    };

    return (
        <div className="h-screen p-2 sm:p-4 flex flex-col">
            <div className="bg-white shadow-md rounded-lg w-full border border-gray-300 flex flex-col overflow-hidden flex-1">
                <div className="p-4 sm:p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between flex-col sm:flex-row mb-4 gap-2">
                        <h1 className="text-xl font-semibold">Transactions</h1>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={exportToExcel}>
                                Export to Excel
                            </Button>

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
                                        <p className="text-red-500">
                                            Please select an end date
                                        </p>
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
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 min-h-0">
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((t) => (
                                <div
                                    key={t._id}
                                    className={`flex justify-between items-center p-3 rounded ${t.type === "income" ? "bg-green-100" : "bg-red-100"
                                        }`}
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {t.type === "income" ? t.category : t.expended_on}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {formatDate(t.date)}
                                        </p>
                                    </div>
                                    <p
                                        className={`font-semibold ${t.type === "income"
                                            ? "text-green-600"
                                            : "text-red-600"
                                            }`}
                                    >
                                        ₹{Number(t.amount).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No transactions found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
