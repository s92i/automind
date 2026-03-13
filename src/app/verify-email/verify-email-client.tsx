"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailClient({ token }: { token: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link, please try again.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `/api/auth/verify-email?token=${encodeURIComponent(token)}`,
        );
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Your email has been verified successfully.");
          setUser(data.user);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed, please try again.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong, please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 px-3">
      <div className="max-w-md w-full">
        <div className="bg-[#15181e] rounded-3xl shadow-2xl px-10 py-12 text-center border border-gray-800 relative">
          <div className="absolute top-7 right-10 animate-fade-in-down">
            {status === "success" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-900 text-green-300 border border-green-600 shadow">
                Verified
              </span>
            )}
            {status === "loading" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-800 text-blue-200 border border-blue-600 shadow">
                Checking...
              </span>
            )}
            {status === "error" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-900 text-red-200 border border-red-700 shadow">
                Error
              </span>
            )}
          </div>

          <div className="mb-10 animate-fade-in-down">
            <Link
              href="/"
              className="group transition-all duration-300 hover:scale-105 inline-block"
            >
              <Image
                src={require("../../assets/logo.png")}
                alt="Automind"
                width={94}
                height={88}
                priority
                className="mx-auto rounded-xl shadow-lg transition-shadow group-hover:shadow-blue-400/10"
              />
            </Link>
            <span className="block mt-3 text-xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text tracking-tight">
              Automind
            </span>
          </div>

          <div className="mb-7 animate-fade-in">
            {status === "loading" && (
              <div className="w-18 h-18 mx-auto bg-linear-to-br from-blue-900 via-indigo-900 to-blue-900 rounded-full flex items-center justify-center shadow-inner">
                <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
              </div>
            )}
            {status === "success" && (
              <div className="w-18 h-18 mx-auto bg-linear-to-br from-green-800 via-green-900 to-green-800 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle className="w-10 h-10 text-green-300" />
              </div>
            )}
            {status === "error" && (
              <div className="w-18 h-18 mx-auto bg-linear-to-br from-red-900 via-black to-red-900 rounded-full flex items-center justify-center shadow-inner">
                <XCircle className="w-10 h-10 text-red-400" />
              </div>
            )}
          </div>

          <h1
            className={`text-3xl font-extrabold mb-4 animate-fade-in-up ${
              status === "success"
                ? "text-green-200"
                : status === "error"
                  ? "text-red-200"
                  : "text-blue-200"
            }`}
          >
            {status === "loading" && "Verifying your email..."}
            {status === "success" && "Email verified"}
            {status === "error" && "Verification failed"}
          </h1>

          <p
            className="text-gray-400 mb-8 min-h-[32px] animate-fade-in-up"
            style={{ transition: "all .2s" }}
          >
            {message}
          </p>

          <div>
            {status === "success" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 bg-linear-to-br from-green-900 via-green-950 to-green-900 border border-green-700 rounded-xl p-4 shadow-green-100/10 shadow-sm">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  <p className="text-green-200 text-sm font-medium">
                    Welcome to <span className="font-bold">Automind!</span> Your
                    account is now active and ready to use.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className="w-full bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-primary hover:to-secondary hover:brightness-110 text-white text-base font-semibold py-3 rounded-xl shadow-md transition"
                    size="lg"
                  >
                    Go to Dashboard
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full border-slate-700 text-gray-200 font-semibold py-3 rounded-xl shadow-md hover:bg-slate-800/40 transition"
                    variant="outline"
                    size="lg"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 bg-linear-to-br from-red-900 via-black to-red-900 border border-red-700 rounded-xl p-4 shadow-red-400/10 shadow-sm">
                  <XCircle className="w-5 h-5 mr-2 text-red-400" />
                  <p className="text-red-200 text-sm font-medium">
                    The verification link may have expired or is invalid. Please
                    request a new verification email.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-primary hover:to-secondary hover:brightness-110 text-white text-base font-semibold py-3 rounded-xl shadow-md transition"
                    size="lg"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={() => router.push("/")}
                    className="w-full border-gray-700 text-gray-200 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-800/50 transition"
                    variant="outline"
                    size="lg"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )}

            {status === "loading" && (
              <div className="space-y-4 animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 bg-linear-to-br from-blue-950 via-black to-blue-900 border border-blue-800 rounded-xl p-4">
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin mr-1" />
                  <p className="text-blue-200 text-sm font-medium">
                    Please wait while we verify your email address.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-10 animate-fade-in-up">
          <p className="text-gray-500 text-xs sm:text-sm">
            Need help?{" "}
            <Link
              href="mailto:support@automind.com"
              className="text-blue-400 hover:underline font-medium transition"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
