"use client"

import { useEffect, useState } from 'react';
import { useExpense } from '../../../../context/ExpenseContext';
import { useIncome } from '../../../../context/IncomeContext';
import Loading from '../common/Loading';

import { Expense, fetchExpenses } from '../../../api/fetchExpense';
import { fetchIncomes, Income } from '../../../api/fetchIncome';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DateRange } from "react-day-picker";
import * as XLSX from 'xlsx';

interface Transaction {
    _id?: string;
    amount: number | string;
    date: string;
    description?: string;
    type: 'income' | 'expense';
    category?: string;
    expended_on?: string;
}

interface TransactionsProps {
    incomeData?: Income[];
    expenseData?: Expense[];
}

const Transactions: React.FC<TransactionsProps> = ({ incomeData, expenseData }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { shouldRefetch: shouldRefetchIncome } = useIncome();
    const { shouldRefetch: shouldRefetchExpense } = useExpense();
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [showRangeNotification, setShowRangeNotification] = useState(false);

    const handleDateRangeChange = (range: DateRange | undefined) => {
        setDateRange(range);
        setShowRangeNotification(!!range?.from && !range?.to);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let incomeTransactions: Income[];
                let expenseTransactions: Expense[];

                if (incomeData && expenseData) {
                    incomeTransactions = incomeData;
                    expenseTransactions = expenseData;
                } else {
                    [incomeTransactions, expenseTransactions] = await Promise.all([
                        fetchIncomes(),
                        fetchExpenses()
                    ]);
                }

                const allTransactions = [
                    ...incomeTransactions.map(item => ({ ...item, type: 'income' as const })),
                    ...expenseTransactions.map(item => ({ ...item, type: 'expense' as const }))
                ];

                // Sort transactions by date, most recent first
                allTransactions.sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime();
                });

                setTransactions(allTransactions);
                setFilteredTransactions(allTransactions);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [incomeData, expenseData, shouldRefetchIncome, shouldRefetchExpense]);

    useEffect(() => {
        if (dateRange?.from) {
            const filtered = transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                if (dateRange.to) {
                    return transactionDate >= dateRange.from! && transactionDate <= dateRange.to;
                }
                return transactionDate >= dateRange.from!;
            });
            setFilteredTransactions(filtered);
        } else {
            setFilteredTransactions(transactions);
        }
    }, [transactions, dateRange]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    const exportToExcel = () => {
        const dataToExport = filteredTransactions.map(transaction => ({
            Type: transaction.type,
            Category: transaction.type === 'income' ? transaction.category : transaction.expended_on,
            Amount: Number(transaction.amount),
            Date: formatDate(transaction.date),
            Description: transaction.description || ''
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Transactions");

        const fileName = `Transactions_${dateRange?.from ? formatDate(dateRange.from.toISOString()) : 'All'}_to_${dateRange?.to ? formatDate(dateRange.to.toISOString()) : 'Now'}.xlsx`;
        XLSX.writeFile(wb, fileName);
    };

    if (loading) return <div className="flex justify-center items-center min-h-[90vh]"><Loading /></div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="min-h-[90vh] p-4 flex flex-col">
            <div className="flex flex-col space-y-4 p-6 bg-white shadow-md rounded-lg w-full min-h-[120px] border border-gray-300">
                <div className="flex justify-between items-center font-semibold">
                    <h1 className="text-md text-black">Transactions:</h1>
                    <div className="flex space-x-2">
                        <Button onClick={exportToExcel} className="text-sm cursor-pointer" variant={"outline"}>
                            Export to Excel
                        </Button>
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
                <div className="flex flex-col space-y-2">
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction._id}
                                className={`flex justify-between items-center p-2 rounded ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                                    }`}
                            >
                                <div>
                                    <p className="font-semibold">
                                        {transaction.type === 'income'
                                            ? transaction.category
                                            : transaction.expended_on}
                                    </p>
                                    <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                                </div>
                                <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    ₹{Number(transaction.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No transactions available for the selected date range.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
