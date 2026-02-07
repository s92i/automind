import { useState } from "react"
import { z } from "zod"
import { Dialog, DialogContent } from "../ui/dialog"
import LeftSideAuthModal from "./parts/LeftSideAuthModal"
import RightSideAuthModal from "./parts/RightSideAuthModal"
import { useAuth } from "@/hooks/useAuth"

interface AuthModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onLoginSuccess?: () => void
}

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
})

const signupSchema = z.object({
    first: z.string().min(1, "First name is required"),
    last: z.string().min(1, "Last name is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string()
}).refine((data) => data.password === data.confirm, {
    message: "Password don't match",
    path: ["confirm"]
})

const AuthModal = ({ isOpen, onOpenChange, onLoginSuccess }: AuthModalProps) => {
    const [activeTab, setActiveTab] = useState("signin")
    const { signup, login, error, loading } = useAuth()
    const [registerForm, setRegisterForm] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
        confirm: ""
    })
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: ""
    })
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-4xl bg-background/95 backdrop-blur-xl border-primary/20 p-0 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    <LeftSideAuthModal />
                    <RightSideAuthModal
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        registerForm={registerForm}
                        setRegisterForm={setRegisterForm}
                        loginForm={loginForm}
                        setLoginForm={setLoginForm}
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        signupSchema={signupSchema}
                        loginSchema={loginSchema}
                        signup={signup}
                        login={login}
                        error={error}
                        loading={loading}
                        onClose={() => {
                        onOpenChange(false)
                        onLoginSuccess?.()
                    }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AuthModal