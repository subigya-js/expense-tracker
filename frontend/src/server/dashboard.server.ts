import { API_BASE_URL } from "@/constants";
import { cookies } from "next/headers";

export interface Income {
    amount: string;
    date: string;
    category?: string;
}

export interface Expense {
    amount: string;
    date: string;
    expended_on?: string;
}

export async function getDashboardData() {
    const token = (await cookies()).get("token")?.value;

    if (!token) throw new Error("Unauthorized");

    const [incomeRes, expenseRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/income`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        }),
        fetch(`${API_BASE_URL}/api/expense`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: "no-store",
        }
        )
    ]);

    if (!incomeRes.ok || !expenseRes.ok) throw new Error("Failed to fetch dashboard data");

    const incomeData: Income[] = await incomeRes.json();
    const expenseData: Expense[] = await expenseRes.json();

    return { incomeData, expenseData };
}