"use client";

import fetchUsage from "@/actions/usage/fetchUsage";
import { PlanCard } from "@/components/billing/plan-card";
import { BILLING_PLANS } from "@/components/config/home/items";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Bitcoin, CreditCard } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BillingHistory from "./billing-history";

type UsageRecord = {
  id: string;
  user_id: string;
  plan: "free" | "pro";
  usage_limit: number;
  usage: number;
  created_at: Date | null;
  updated_at: Date | null;
};

function formatPlanLabel(plan?: UsageRecord["plan"]) {
  if (!plan) return "Free";
  return plan === "free" ? "Free" : "Pro";
}

export default function BillingClient() {
  const { user } = useUser();
  const searchParams = useSearchParams();

  const [usageData, setUsageData] = useState<UsageRecord | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [cryptoLoading, setCryptoLoading] = useState(false);
  const [confirmingStripe, setConfirmingStripe] = useState(false);

  const hasConfirmedRef = useRef(false);

  const currentPlan = formatPlanLabel(usageData?.plan);
  const usedRuns = usageData?.usage ?? 0;
  const totalRuns =
    usageData?.usage_limit ?? (currentPlan === "Pro" ? 10000 : 1000);

  const loadUsage = useCallback(async () => {
    try {
      if (!user?.id) return;
      const res = await fetchUsage({ user_id: user.id });
      setUsageData(res as UsageRecord | null);
    } catch (error) {
      console.error("Failed to load usage:", error);
      toast.error("Failed to load billing usage");
    }
  }, [user?.id]);

  useEffect(() => {
    loadUsage();
  }, [loadUsage]);

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (
      !user?.id ||
      success !== "true" ||
      !sessionId ||
      hasConfirmedRef.current
    ) {
      return;
    }

    hasConfirmedRef.current = true;

    const confirmStripePayment = async () => {
      try {
        setConfirmingStripe(true);

        const res = await fetch("/api/billing/stripe/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Failed to confirm Stripe payment");
        }

        await loadUsage();
        toast.success("Your Pro plan has been activated");
      } catch (error) {
        console.error("Stripe confirmation error:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to confirm Stripe payment",
        );
      } finally {
        setConfirmingStripe(false);
      }
    };

    confirmStripePayment();
  }, [searchParams, user?.id, loadUsage]);

  const handleUpgradeStripe = async () => {
    try {
      setStripeLoading(true);

      const res = await fetch("/api/billing/stripe/checkout", {
        method: "POST",
      });

      const json = await res.json();

      if (json?.url) {
        window.location.href = json.url;
        return;
      }

      toast.error("Stripe checkout not available at this moment");
    } catch (error) {
      console.error("Stripe payment error:", error);
      toast.error("Something went wrong with Stripe payment");
    } finally {
      setStripeLoading(false);
    }
  };

  const handleUpgradeCrypto = async () => {
    try {
      if (!user?.id) {
        toast.error("You must be logged in to start a payment");
        return;
      }

      setCryptoLoading(true);

      const res = await fetch("/api/billing/cryptomus/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: "19.99",
          currency: "USD",
          user_id: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "Failed to create Cryptomus payment link",
        );
      }

      if (!data?.url) {
        throw new Error("Cryptomus payment link is unavailable at this moment");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Cryptomus payment error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start Cryptomus payment",
      );
    } finally {
      setCryptoLoading(false);
    }
  };

  const handleSelectPlan = (planName: string) => {
    if (planName === currentPlan) return;

    if (planName === "Free") {
      toast.success("Downgrading to Free plan...");
    } else {
      toast.success(`Upgrading to ${planName} plan...`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Usage</h1>
        <p className="text-gray-400">
          Manage your subscription and view usage statistics
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-1">
          <Card className="bg-[#121826] border-[#1E293B] h-full min-h-[500px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl text-white">
                  Current Plan
                </CardTitle>
                <p className="text-gray-400">
                  You are currently on the {currentPlan} plan
                </p>
              </div>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                {currentPlan}
              </Badge>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={handleUpgradeStripe}
                  disabled={stripeLoading || cryptoLoading || confirmingStripe}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {stripeLoading ? "Redirecting..." : "Upgrade with Stripe"}
                </Button>

                <Button
                  onClick={handleUpgradeCrypto}
                  disabled={
                    stripeLoading ||
                    cryptoLoading ||
                    confirmingStripe ||
                    !user?.id
                  }
                  variant="outline"
                  className="border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white disabled:opacity-60"
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  {cryptoLoading ? "Redirecting..." : "Pay with Crypto"}
                </Button>
              </div>

              <div className="mt-8 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-400">Monthly Usage</span>
                  <span
                    className={`text-sm font-medium ${
                      usedRuns >= totalRuns ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {usedRuns} of {totalRuns} {totalRuns === 1 ? "run" : "runs"}
                  </span>
                </div>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      usedRuns >= totalRuns ? "bg-red-500" : "bg-green-500"
                    }`}
                    style={{
                      width: `${Math.min((usedRuns / totalRuns) * 100, 100)}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500">
                  {usedRuns >= totalRuns
                    ? `${usedRuns - totalRuns} runs over this month`
                    : `${totalRuns - usedRuns} runs remaining this month`}
                </p>

                {confirmingStripe && (
                  <p className="text-xs text-blue-400">
                    Confirming your Stripe payment...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlanCard
            key={BILLING_PLANS[0].name}
            name={BILLING_PLANS[0].name}
            price={BILLING_PLANS[0].price}
            description={BILLING_PLANS[0].description}
            features={BILLING_PLANS[0].features}
            isPopular={BILLING_PLANS[0].popular}
            isCurrent={BILLING_PLANS[0].name === currentPlan}
            onSelect={() => handleSelectPlan(BILLING_PLANS[0].name)}
          />

          <PlanCard
            key={BILLING_PLANS[1].name}
            name={BILLING_PLANS[1].name}
            price={BILLING_PLANS[1].price}
            description={BILLING_PLANS[1].description}
            features={BILLING_PLANS[1].features}
            isPopular={BILLING_PLANS[1].popular}
            isCurrent={BILLING_PLANS[1].name === currentPlan}
            onSelect={() => handleSelectPlan(BILLING_PLANS[1].name)}
          />
        </div>
      </div>

      <BillingHistory />
    </div>
  );
}
