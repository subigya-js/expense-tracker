import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const token = (await cookies()).get("token");
    if (!token) redirect("/login");
    return <>{children}</>;
}