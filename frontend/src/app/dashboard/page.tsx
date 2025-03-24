"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-[90vh] flex justify-center items-center">
       <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="flex flex-col space-y-4 p-8 bg-white shadow-md rounded-lg min-w-[30%]">
        <h1>Name: {user.name}</h1>
        <h1>Email: {user.email}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
