"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setRegisterData({ name: "", email: "", password: "" }); // Reset form
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <form
        className="w-full max-w-md space-y-4 p-8 bg-white shadow-md rounded-lg"
        onSubmit={registerSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            placeholder="Enter your name"
            value={registerData.name}
            onChange={(e) =>
              setRegisterData({ ...registerData, name: e.target.value })
            }
            required
          />
        </div>

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
            value={registerData.email}
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
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
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 cursor-pointer text-gray-500" /> : <Eye className="h-5 w-5 cursor-pointer text-gray-500" />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-col gap-4 items-center justify-between">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>

          <Link
            href="/login"
            className="text-sm text-gray-500 hover:text-gray-700 duration-200"
          >
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
