"use server"

import { cookies } from "next/headers";
import { API_BASE_URL } from "../constants";

export async function loginAction(
    email: string,
    password: string
) {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        return { error: data.message || "Login failed." };
    }

    (await cookies()).set("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
    });

    return { success: true };
}

export async function registerAction(
    name: string,
    email: string,
    password: string
) {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json();

    if (!res.ok) {
        return { error: data.message || "Registration failed." }
    }

    return { success: true }
}

export async function logoutAction() {
    (await cookies()).delete("token");
}