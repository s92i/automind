'use client'

import logo from "@/assets/logo.png";
import { SIDEBAR_ITEMS } from "@/components/config/dashboard/items";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Activity, Workflow, LayoutTemplate as Template, CreditCard, Settings, User, LogOut } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";

const ICON_MAP = {
    activity: Activity,
    workflow: Workflow,
    template: Template,
    "credit-card": CreditCard,
    settings: Settings
} as const

const Sidebar = () => {
    const pathname = usePathname()
    const { logout } = useAuth()
    const router = useRouter()

    return (
        <div className="w-64 bg-[#121826] border-r border-[#1e293b] flex flex-col">
            <div className="px-4 pt-3 pb-2">
                <Link href="/" className="flex items-center">
                    <Image src={logo} alt="Automind" width={250} height={190} />
                </Link>
            </div>
            <nav className="flex-1 px-4 pt-0">
                <ul className="space-y-5">
                    {SIDEBAR_ITEMS.map((item) => {
                        const Icon = ICON_MAP[item.icon]
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

                        return (
                            <li key={item.name}>
                                <Link href={item.href} className={cn("flex items-center space-x-3 px-3 py-1.5 rounded text-sm font-medium leading-tight transition-all duration-200", isActive ? "bg-green-500/10 text-green-400 glow" : "text-gray-300 hover:bg-[#1e293b]")}>
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <div className="mt-auto p-3 border-t border-[#1e293b] space-y-4 mb-2">
                <Link href={"/dashboard/settings"} className="flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 hover:bg-[#1e293b] hover:text-white transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                </Link>
                <button type="button" onClick={async () => {
                    await logout()
                    router.push('/')
                }} className="w-full flex items-center space-x-2 px-3 py-2 rounded text-sm text-gray-300 cursor-pointer">
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-red-400">Logout</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar