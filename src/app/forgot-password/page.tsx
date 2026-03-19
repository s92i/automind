"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const ok = await forgotPassword(normalizedEmail);

    if (ok) {
      setSuccess(true);
      setEmail("");
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
            <Mail className="h-5 w-5" />
          </div>

          <h1 className="text-2xl font-bold">Forgot password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email address and we&apos;ll send you a password reset
            link.
          </p>
        </div>

        {success ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
              If an account exists for that email, a password reset link has
              been sent.
            </div>

            <Link href="/">
              <Button className="h-11 w-full rounded-xl" variant="hero">
                Back to sign in
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl"
                required
                autoComplete="email"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="h-11 w-full rounded-xl"
              variant="hero"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
