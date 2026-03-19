"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
  emailVerified: boolean;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signup(
    name: string,
    email: string,
    password: string,
    captchaToken?: string,
  ) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Signup failed");
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function verifyEmail(email: string, code: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verification failed");
      setUser(data.user);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 403) {
          throw new Error(
            "Please verify your email address before logging in. Check your email for the verification link",
          );
        }
        throw new Error(data.error || "Verification failed");
      }
      await me();
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function forgotPassword(email: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to send reset email");
      }

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(token: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to reset password");
      }

      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }

  async function me() {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return setUser(null);
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  }

  return {
    user,
    loading,
    error,
    signup,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    logout,
    me,
  };
}
