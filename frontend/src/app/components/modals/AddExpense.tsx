"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "../../../../context/ModalContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

const AddExpense = () => {
  const { isOpen, closeModal } = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expense, setExpense] = useState({
    expended_on: "",
    amount: "",
    date: "",
    payment_method: "",
    note: "",
  });

  const onExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // alert(JSON.stringify(expense, null, 2)); // Pretty-prints JSON
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You need to be logged in to add an expense.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/expense/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(expense)
      });

      if (!response.ok) {
        throw new Error("Failed to add expense.");
      }

      const data = await response.json();
      console.log("Expense added:", data);
      closeModal();
    }
    catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>
        <form
          className="w-full max-w-md space-y-4 p-8 bg-white rounded-lg"
          onSubmit={onExpenseSubmit}
        >
          <div>
            <label
              htmlFor="expended_on"
              className="block text-sm font-medium text-gray-700"
            >
              Expended on <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="expended_on"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="Watermelon"
              value={expense.expended_on}
              onChange={(e) =>
                setExpense({ ...expense, expended_on: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="100"
              value={expense.amount}
              onChange={(e) =>
                setExpense({ ...expense, amount: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="100"
              value={expense.date}
              onChange={(e) =>
                setExpense({ ...expense, date: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="payment_method"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method <span className="text-red-500">*</span>
            </label>
            <Select value={expense.payment_method}
              onValueChange={(value) => setExpense({ ...expense, payment_method: value })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Select a payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="debit_card">Debit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <input
              type="text"
              id="note"
              name="note"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
             focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:italic"
              placeholder="Brought watermelon while going for a walk... (Optional)"
              value={expense.note}
              onChange={(e) =>
                setExpense({ ...expense, note: e.target.value })
              }
            />
          </div>
          <p>{error && error}</p>
          <Button type="submit">
            {isLoading ? "Adding Expense..." : "Add Expense"}
          </Button>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default AddExpense
