import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs"
import { type Dispatch, FormEvent, type SetStateAction, useState } from "react"
import { ZodError, type ZodType } from "zod"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export interface RegisterProps {
    registerForm: { first: string; last: string; email: string; password: string; confirm: string }
    setRegisterForm: Dispatch<SetStateAction<{ first: string; last: string; email: string; password: string; confirm: string }>>
    validationErrors: Record<string, string>
    setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>
    signupSchema: ZodType<{ first: string; last: string; email: string; password: string; confirm: string }>
    setActiveTab: (tab: string) => void
    signup: (name: string, email: string, password: string) => Promise<boolean | undefined>
    error: string | null
    loading: boolean
    onRegisterSuccess?: () => void
}

const Register = ({ registerForm, setRegisterForm, validationErrors, setValidationErrors, signupSchema, setActiveTab, signup, error, loading, onRegisterSuccess }: RegisterProps) => {
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function handleRegister(e: FormEvent) {
        e.preventDefault()
        setValidationErrors({})
        try {
            const validateData = signupSchema.parse(registerForm)

            const name = `${validateData.first} ${validateData.last}`
            const ok = await signup(name, validateData.email, validateData.password)

            if (ok) {
                toast.success("Check your email for activating your account")
                setRegisterForm({
                    first: "",
                    last: "",
                    email: "",
                    password: "",
                    confirm: ""
                })
                onRegisterSuccess?.()
            }
        } catch (error: any) {
            if (error instanceof ZodError) {
                const errors: Record<string, string> = {}
                error.issues.forEach((issue) => {
                    if (issue.path[0]) {
                        errors[issue.path[0] as string] = issue.message
                    }
                })
                setValidationErrors(errors)
            }
        }
    }

    return (
        <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister}>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label htmlFor="register-first" className="text-sm font-medium">First Name</Label>
                            <Input id="register-first" type="text" value={registerForm.first} onChange={(e) => setRegisterForm({ ...registerForm, first: e.target.value })} placeholder="John" className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20" />
                            {validationErrors.first && (
                                <p className="text-red-500 text-sm">{validationErrors.first}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="register-last" className="text-sm font-medium">Last Name</Label>
                            <Input id="register-last" type="text" value={registerForm.last} onChange={(e) => setRegisterForm({ ...registerForm, last: e.target.value })} placeholder="Doe" className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20" />
                            {validationErrors.last && (
                                <p className="text-red-500 text-sm">{validationErrors.last}</p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-sm font-medium">Email Address</Label>
                        <Input id="register-email" type="text" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} placeholder="john@test.com" className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20" />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm">{validationErrors.email}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                            <Input
                                id="register-password"
                                type={showRegisterPassword ? "text" : "password"}
                                value={registerForm.password}
                                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                placeholder="Create a strong password"
                                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowRegisterPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                                aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                            >
                                {showRegisterPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        <div className="text-xs text-muted-foreground">Must be at least 8 characters with numbers and symbols</div>
                        {validationErrors.password && (
                            <p className="text-red-500 text-sm">{validationErrors.password}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="register-confirm" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="register-confirm"
                                type={showConfirmPassword ? "text" : "password"}
                                value={registerForm.confirm}
                                onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                                placeholder="Confirm your password"
                                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {validationErrors.confirm && (
                            <p className="text-red-500 text-sm">{validationErrors.confirm}</p>
                        )}
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                        <input type="checkbox" className="mt-1 rounded border-primary/20 cursor-pointer" />
                        <span className="text-muted-foreground">
                            I argee to the{' '}
                            <button className="text-primary hover:underline cursor-pointer">Terms of Service</button>{' '}
                            and{' '}
                            <button className="text-primary hover:underline cursor-pointer">Privacy Policy</button>
                        </span>
                    </div>
                    <Button type="submit" className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary" variant="hero" disabled={loading}>
                        Create Account
                        <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </form>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account ?{' '}
                <button className="text-primary hover:underline font-medium cursor-pointer" onClick={() => setActiveTab("signin")}>Sign in</button>
            </div>
        </TabsContent>
    )
}

export default Register