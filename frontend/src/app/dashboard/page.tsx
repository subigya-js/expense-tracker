"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || !parsedUser.id || !parsedUser.name || !parsedUser.email) {
        throw new Error("Invalid user data");
      }
      setUser(parsedUser);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null; // This should not happen, but just in case
  }

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col space-y-4 p-8 bg-white shadow-md rounded-lg min-w-[30%]">
        <h1 className="text-2xl font-bold">Welcome, {user.name}!</h1>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Dashboard;
