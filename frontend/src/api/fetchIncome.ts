const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

export interface Income {
    amount: string;
    date: string;
    // Add other fields as needed
}

export const fetchIncomes = async (): Promise<Income[]> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/income/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch income data");
        }

        const incomeData: Income[] = await response.json();
        return incomeData;
    } catch (error) {
        console.error("Error fetching incomes:", error);
        throw error;
    }
};
