"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/useUser"
import { Plus, Search } from "lucide-react"
import { useState } from "react"

const Topbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const { user, loading } = useUser()

    if (loading) {
        return null
    }

    return (
        <header className="h-16 bg-[#121826] border-b border-[#1E293B] px-6 flex items-center justify-between">
            <div className="flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search workflows..." className="pl-10 bg-[#1E293B] border-[#334155] text-gray-200 placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-medium glow">
                    <Plus className="w-4 h-4 mr-2" />
                    New Workflow
                </Button>
            </div>
        </header>
    )
}

export default Topbar