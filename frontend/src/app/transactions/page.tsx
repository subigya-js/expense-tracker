import { getDashboardData } from "@/server/dashboard.server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Transactions from "../components/dashboard/Transactions";

interface IncomeData {
    amount: string;
    date: string;
    category?: string;
}

interface ExpenseData {
    amount: string;
    date: string;
    expended_on?: string;
    category?: string;
}

export default async function TransactionsPage() {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");

    const { incomeData, expenseData } = await getDashboardData();

    // Merge + normalize on SERVER
    const transactions = [
        ...incomeData.map((i: IncomeData) => ({
            ...i,
            type: "income" as const,
        })),
        ...expenseData.map((e: ExpenseData) => ({
            ...e,
            type: "expense" as const,
        })),
    ].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return <Transactions transactions={transactions} />;
}
