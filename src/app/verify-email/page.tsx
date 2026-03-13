import { Suspense } from "react";
import VerifyEmailClient from "./verify-email-client";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <VerifyEmailClient token={token} />
    </Suspense>
  );
}
