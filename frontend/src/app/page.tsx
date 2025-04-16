"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if ((storedUser && storedUser !== null) || "undefined") {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <div></div>;
}
