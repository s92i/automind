"use client";

import Link from "next/link";
import { Suspense, FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const errorParam = searchParams.get("error") || "";

  const { resetPassword, loading, error } = useAuth();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const hasInvalidLink = !token || Boolean(errorParam);

  const canSubmit = useMemo(() => {
    return Boolean(!hasInvalidLink && password && confirm && !loading);
  }, [hasInvalidLink, password, confirm, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (!token) {
      setLocalError("Invalid or missing reset link.");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }

    const ok = await resetPassword(token, password);

    if (ok) {
      setSuccess(true);
      setPassword("");
      setConfirm("");
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="mb-6">
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </div>

          <h1 className="text-2xl font-bold">Reset password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
              Your password has been updated successfully.
            </div>

            <Link href="/">
              <Button className="h-11 w-full rounded-xl" variant="hero">
                Go to sign in
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {hasInvalidLink && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500">
                Invalid or expired reset link.
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                New password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl pr-10"
                  autoComplete="new-password"
                  disabled={hasInvalidLink}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={hasInvalidLink}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirm"
                className="text-sm font-medium text-foreground"
              >
                Confirm password
              </label>
              <div className="relative">
                <Input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="h-11 rounded-xl pr-10"
                  autoComplete="new-password"
                  disabled={hasInvalidLink}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  disabled={hasInvalidLink}
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {(localError || error) && (
              <p className="text-sm text-red-500">{localError || error}</p>
            )}

            <Button
              type="submit"
              disabled={!canSubmit}
              className="h-11 w-full rounded-xl"
              variant="hero"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update password"
              )}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background px-4 py-10">
          <div className="mx-auto w-full max-w-md rounded-3xl border border-border/60 bg-background/80 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading...
            </div>
          </div>
        </main>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
