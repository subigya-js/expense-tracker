"use server"

import { API_BASE_URL } from "@/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface IncomeData {
    amount: number | string;
    category: string;
    date: string;
    description?: string;
}

export async function addIncome(income: IncomeData) {
    const token = (await cookies()).get("token")?.value;

    if (!token) throw new Error("Unauthorized")

    const res = await fetch(`${API_BASE_URL}/api/income/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(income),
    });

    if (!res.ok) throw new Error("Failed to add income");

    // Refresh server data
    revalidatePath("/dashboard");
    revalidatePath("/transactions");
}