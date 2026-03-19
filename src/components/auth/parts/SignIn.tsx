import Link from "next/link";
import { type Dispatch, FormEvent, type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { ZodError, type ZodType } from "zod";

export interface SignInProps {
  loginForm: { email: string; password: string };
  setLoginForm: Dispatch<SetStateAction<{ email: string; password: string }>>;
  validationErrors: Record<string, string>;
  setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>;
  setActiveTab: (tab: string) => void;
  loginSchema: ZodType<{ email: string; password: string }>;
  login: (email: string, password: string) => Promise<boolean>;
  loading: boolean;
  onLoginSuccess?: () => void;
}

const SignIn = ({
  loginForm,
  setLoginForm,
  validationErrors,
  setValidationErrors,
  setActiveTab,
  loginSchema,
  login,
  loading,
  onLoginSuccess,
}: SignInProps) => {
  const [showSigninPassword, setShowSigninPassword] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setValidationErrors({});

    try {
      const validatedData = loginSchema.parse({
        email: loginForm.email,
        password: loginForm.password,
      });
      const ok = await login(validatedData.email, validatedData.password);
      if (ok) onLoginSuccess?.();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
      }
    }
  }

  return (
    <TabsContent value="signin" className="space-y-4 mt-6">
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="signin-email"
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              placeholder="Enter your email address"
              className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signin-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="signin-password"
                type={showSigninPassword ? "text" : "password"}
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                placeholder="Enter your password"
                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowSigninPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                aria-label={
                  showSigninPassword ? "Hide password" : "Show password"
                }
              >
                {showSigninPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-primary/20 cursor-pointer"
              />
              <span className="text-muted-foreground">Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-primary hover:underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary"
            variant="hero"
            disabled={loading}
          >
            Sign In
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account ?{" "}
        <button
          className="text-primary hover:underline font-medium cursor-pointer"
          onClick={() => setActiveTab("register")}
        >
          Sign up for free
        </button>
      </div>
    </TabsContent>
  );
};

export default SignIn;
