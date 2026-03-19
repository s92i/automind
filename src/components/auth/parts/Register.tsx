"use client";

import Link from "next/link";
import Script from "next/script";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  type Dispatch,
  FormEvent,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ZodError, type ZodType } from "zod";
import { ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export interface RegisterProps {
  registerForm: {
    first: string;
    last: string;
    email: string;
    password: string;
    confirm: string;
  };
  setRegisterForm: Dispatch<
    SetStateAction<{
      first: string;
      last: string;
      email: string;
      password: string;
      confirm: string;
    }>
  >;
  validationErrors: Record<string, string>;
  setValidationErrors: Dispatch<SetStateAction<Record<string, string>>>;
  signupSchema: ZodType<{
    first: string;
    last: string;
    email: string;
    password: string;
    confirm: string;
  }>;
  setActiveTab: (tab: string) => void;
  signup: (
    name: string,
    email: string,
    password: string,
    captchaToken?: string,
  ) => Promise<boolean | undefined>;
  error: string | null;
  loading: boolean;
  onRegisterSuccess?: () => void;
}

const Register = ({
  registerForm,
  setRegisterForm,
  validationErrors,
  setValidationErrors,
  signupSchema,
  setActiveTab,
  signup,
  error,
  loading,
  onRegisterSuccess,
}: RegisterProps) => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [agreedToPolicies, setAgreedToPolicies] = useState(false);
  const [termsError, setTermsError] = useState("");

  const [captchaToken, setCaptchaToken] = useState("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null,
  );
  const [captchaError, setCaptchaError] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(agreedToPolicies && captchaToken && !loading);
  }, [agreedToPolicies, captchaToken, loading]);

  useEffect(() => {
    if (
      !turnstileLoaded ||
      !window.turnstile ||
      !siteKey ||
      turnstileWidgetId
    ) {
      return;
    }

    const el = document.getElementById("register-turnstile-container");
    if (!el) return;

    const id = window.turnstile.render(el, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token) => {
        setCaptchaToken(token);
        setCaptchaError("");
      },
      "expired-callback": () => {
        setCaptchaToken("");
      },
      "error-callback": () => {
        setCaptchaToken("");
        setCaptchaError("Captcha error. Please try again.");
      },
    });

    setTurnstileWidgetId(id);

    return () => {
      if (window.turnstile && id) {
        window.turnstile.remove(id);
      }
    };
  }, [turnstileLoaded, siteKey, turnstileWidgetId]);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setValidationErrors({});
    setTermsError("");
    setCaptchaError("");

    if (!agreedToPolicies) {
      setTermsError(
        "You must agree to the Terms of Service and Privacy Policy.",
      );
      return;
    }

    if (!captchaToken) {
      setCaptchaError("Please complete the captcha.");
      return;
    }

    try {
      const validateData = signupSchema.parse(registerForm);

      const name = `${validateData.first} ${validateData.last}`;
      const ok = await signup(
        name,
        validateData.email,
        validateData.password,
        captchaToken,
      );

      if (ok) {
        toast.success("Check your email for activating your account");
        setRegisterForm({
          first: "",
          last: "",
          email: "",
          password: "",
          confirm: "",
        });
        setAgreedToPolicies(false);
        setTermsError("");
        setCaptchaError("");
        setCaptchaToken("");

        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
        }

        onRegisterSuccess?.();
      } else {
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
        }
        setCaptchaToken("");
      }
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            errors[issue.path[0] as string] = issue.message;
          }
        });
        setValidationErrors(errors);
      }

      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
      setCaptchaToken("");
    }
  }

  return (
    <TabsContent value="register" className="space-y-4 mt-6">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setTurnstileLoaded(true)}
      />

      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="register-first" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="register-first"
                type="text"
                value={registerForm.first}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, first: e.target.value })
                }
                placeholder="John"
                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
              />
              {validationErrors.first && (
                <p className="text-red-500 text-sm">{validationErrors.first}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-last" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="register-last"
                type="text"
                value={registerForm.last}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, last: e.target.value })
                }
                placeholder="Doe"
                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
              />
              {validationErrors.last && (
                <p className="text-red-500 text-sm">{validationErrors.last}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="register-email"
              type="email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
              placeholder="john@test.com"
              className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20"
            />
            {validationErrors.email && (
              <p className="text-red-500 text-sm">{validationErrors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="register-password"
                type={showRegisterPassword ? "text" : "password"}
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
                placeholder="Create a strong password"
                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowRegisterPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                aria-label={
                  showRegisterPassword ? "Hide password" : "Show password"
                }
              >
                {showRegisterPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-xs text-muted-foreground">
              Must be at least 8 characters with numbers and symbols
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-sm">
                {validationErrors.password}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirm" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="register-confirm"
                type={showConfirmPassword ? "text" : "password"}
                value={registerForm.confirm}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, confirm: e.target.value })
                }
                placeholder="Confirm your password"
                className="h-11 bg-muted/20 border-primary/20 focus:border-primary focus:ring-primary/20 pr-10"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary focus:outline-none cursor-pointer"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
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

          <div className="space-y-2">
            <label
              htmlFor="agree-policies"
              className={`flex items-start gap-3 rounded-xl border p-4 transition-all cursor-pointer select-none ${
                agreedToPolicies
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-primary/20 bg-muted/20 hover:border-primary/40"
              }`}
            >
              <input
                id="agree-policies"
                type="checkbox"
                checked={agreedToPolicies}
                onChange={(e) => {
                  setAgreedToPolicies(e.target.checked);
                  if (e.target.checked) {
                    setTermsError("");
                  }
                }}
                className="sr-only"
              />

              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                  agreedToPolicies
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/30 bg-background"
                }`}
              >
                {agreedToPolicies && <Check className="h-3.5 w-3.5" />}
              </div>

              <span className="text-sm leading-6 text-muted-foreground">
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="font-medium text-primary underline underline-offset-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-primary underline underline-offset-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {termsError && <p className="text-red-500 text-sm">{termsError}</p>}
          </div>

          <div className="space-y-3">
            <div
              id="register-turnstile-container"
              className="min-h-[65px] rounded-xl border border-dashed border-primary/20 bg-muted/20 p-2"
            />

            {captchaError ? (
              <p className="text-sm text-red-500">{captchaError}</p>
            ) : (
              <p className="text-xs leading-5 text-muted-foreground">
                Protected by captcha and anti-spam validation.
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-gradient-primary hover:shadow-glow-primary disabled:opacity-60 disabled:cursor-not-allowed"
            variant="hero"
            disabled={!canSubmit}
          >
            Create Account
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account ?{" "}
        <button
          className="text-primary hover:underline font-medium cursor-pointer"
          onClick={() => setActiveTab("signin")}
        >
          Sign in
        </button>
      </div>
    </TabsContent>
  );
};

export default Register;
