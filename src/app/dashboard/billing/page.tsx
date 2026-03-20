import { Suspense } from "react";
import BillingClient from "./billing-client";

function BillingFallback() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Usage</h1>
        <p className="text-gray-400">
          Manage your subscription and view usage statistics
        </p>
      </div>
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingFallback />}>
      <BillingClient />
    </Suspense>
  );
}
