import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDashboardData } from "@/server/dashboard.server";
import Transactions from "../components/dashboard/Transactions";

export default async function TransactionsPage() {
  const token = (await cookies()).get("token");
  if (!token) redirect("/login");

  const { incomeData, expenseData } = await getDashboardData();

  // 🔥 Merge + normalize on SERVER
  const transactions = [
    ...incomeData.map((i: any) => ({
      ...i,
      type: "income" as const,
    })),
    ...expenseData.map((e: any) => ({
      ...e,
      type: "expense" as const,
    })),
  ].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <Transactions transactions={transactions} />;
}
