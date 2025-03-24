"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if ((storedUser && storedUser !== null) || "undefined") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <div></div>;
}
