"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../../../context/AuthContext";

interface LoginData {
  email: string;
  password: string;
}

const API_BASE_URL = "https://expense-tracker-pi-beryl.vercel.app";

const LoginPage = () => {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const [loginData, setLoginData] = React.useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
        setLoginData({ email: "", password: "" });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <form
        className="w-full max-w-md space-y-4 p-8 bg-white shadow-md rounded-lg"
        onSubmit={loginSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pr-10"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 cursor-pointer text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 cursor-pointer text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div className="flex flex-col gap-4 items-center justify-between">
          <Button type="submit" className="w-full">
            {loading ? "Loading..." : "Login"}
          </Button>

          <Link
            href="/register"
            className="text-sm text-gray-500 hover:text-gray-700 duration-200"
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
