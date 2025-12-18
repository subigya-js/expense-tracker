"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { API_BASE_URL } from "../constants";

interface ExpenseData {
    amount: number | string;
    expended_on: string;
    category: string;
    date: string;
    payment_method: string;
    note?: string;
}

export async function addExpense(expense: ExpenseData) {
    const token = (await cookies()).get("token")?.value;

    if (!token) throw new Error("Unauthorized");

    const res = await fetch(`${API_BASE_URL}/api/expense/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expense),
    });

    if (!res.ok) throw new Error("Failed to add expense");

    // Refresh server data
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
}