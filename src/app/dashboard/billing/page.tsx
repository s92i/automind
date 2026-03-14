"use client";

import fetchUsage from "@/actions/usage/fetchUsage";
import { PlanCard } from "@/components/billing/plan-card";
import { BILLING_PLANS } from "@/components/config/home/items";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Bitcoin, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import BillingHistory from "./billing-history";

type UsageRecord = {
  id: string;
  user_id: string;
  plan: "free" | "pro";
  usage_limit: number;
  usage: number;
  created_at: string;
  updated_at: string;
};

function formatPlanLabel(plan?: UsageRecord["plan"]) {
  if (!plan) return "Free";
  return plan === "free" ? "Free" : "Pro";
}

const Billing = () => {
  const { user } = useUser();
  const [usageData, setUsageData] = useState<UsageRecord | null>(null);
  const currentPlan = formatPlanLabel(usageData?.plan);

  useEffect(() => {
    const loadUsage = async () => {
      if (user && user.id) {
        const res = await fetchUsage({ user_id: user.id });
        setUsageData(res as any);
      }
    };
    loadUsage();
  }, [user]);

  const usedRuns = usageData?.usage ?? 0;
  const totalRuns =
    usageData?.usage_limit ?? (currentPlan === "Pro" ? 10000 : 1000);

  const handleUpgradeStripe = () => {
    console.log("Stripe Payment");
  };

  const handleUpgradeCrypto = () => {
    console.log("Crypto Payment");
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
                  You are current on the {currentPlan} plan
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Upgrade with Stripe
                </Button>
                <Button
                  onClick={handleUpgradeCrypto}
                  variant="outline"
                  className="border-[#334155] text-gray-300 hover:bg-[#1E293B] hover:text-white"
                >
                  <Bitcoin className="w-4 h-4 mr-2" />
                  Pay with Crypto
                </Button>
              </div>
              <div className="mt-8 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-400">Monthly Usage</span>
                  <span
                    className={`text-sm font-medium ${usedRuns >= totalRuns ? "text-red-400" : "text-green-400"}`}
                  >
                    {usedRuns} of {totalRuns} {totalRuns === 1 ? "run" : "runs"}
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`${usedRuns >= totalRuns ? "bg-red-500" : "bg-green-500"} h-full`}
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
};

export default Billing;
