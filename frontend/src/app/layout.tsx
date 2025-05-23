import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AddExpense from "./components/modals/AddExpense";
import { ModalProvider } from "../../context/ModalContext";
import { AuthProvider } from "../../context/AuthContext";
import { IncomeProvider } from "../../context/IncomeContext";
import { ExpenseProvider } from "../../context/ExpenseContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "A full-stack Expense Tracker built with Next.js for the frontend and Express.js for the backend. This application helps users efficiently manage their finances by tracking income and expenses with interactive visualizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <IncomeProvider>
            <ExpenseProvider>
              <ModalProvider>
                <Navbar />
                <main className="min-h-screen">
                  {children}
                </main>
                <Footer />
                <AddExpense />
              </ModalProvider>
            </ExpenseProvider>
          </IncomeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
