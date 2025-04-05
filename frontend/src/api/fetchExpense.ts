const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

export interface Expense {
    amount: string;
    date: string;
    // Add other fields as needed
}

export const fetchExpenses = async (): Promise<Expense[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/expense/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch expense data");
        }

        const expenseData: Expense[] = await response.json();
        return expenseData;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
};
