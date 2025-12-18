import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDashboardData } from "@/server/dashboard.server";
import Dashboard from "../components/dashboard/Dashboard"

export default async function DashboardPage() {
  const token = (await cookies()).get("token");
  if (!token) redirect("/login");

  const { incomeData, expenseData } = await getDashboardData();

  return (
    <Dashboard
      incomeData={incomeData}
      expenseData={expenseData}
    />
  );
}
