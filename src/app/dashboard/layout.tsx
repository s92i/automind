import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { type ReactNode } from "react";

export const metdata = {
    title: "Automind - Dashboard",
    description: "AI automation platform for smart workflows & intelligent agents"
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-[#0B0F14]">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-auto bg-linear-to-br from-[#0B0F14] to-[#0E1320]">
                    {children}
                </main>
            </div>
        </div>
    )
}