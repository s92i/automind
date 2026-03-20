import { auth, db } from "@/lib/auth";
import { user } from "@/db/auth.schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { upsertUsagePlan } from "@/lib/billing/upsert-usage-plan";

async function findUserById(userId: string | null | undefined) {
  if (!userId) return null;

  const rows = await db.select().from(user).where(eq(user.id, userId)).limit(1);

  return rows.length ? rows[0] : null;
}

async function findUserByEmail(email: string | null | undefined) {
  if (!email) return null;

  const rows = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return rows.length ? rows[0] : null;
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as { session_id?: string };
    const sessionId = body.session_id;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 },
      );
    }

    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (checkoutSession.mode !== "subscription") {
      return NextResponse.json(
        { error: "Invalid checkout session mode" },
        { status: 400 },
      );
    }

    if (checkoutSession.status !== "complete") {
      return NextResponse.json(
        { error: "Checkout session not complete" },
        { status: 400 },
      );
    }

    const subscription =
      typeof checkoutSession.subscription === "object" &&
      checkoutSession.subscription !== null
        ? checkoutSession.subscription
        : null;

    const subscriptionStatus = subscription?.status ?? null;
    const isActive =
      subscriptionStatus === "active" || subscriptionStatus === "trialing";

    if (!isActive) {
      return NextResponse.json(
        {
          error: "Subscription is not active",
          subscriptionStatus,
        },
        { status: 400 },
      );
    }

    let appUserId =
      checkoutSession.client_reference_id ??
      checkoutSession.metadata?.userId ??
      null;

    if (!appUserId) {
      const email = checkoutSession.customer_details?.email ?? null;
      const matchedUser = await findUserByEmail(email);
      appUserId = matchedUser?.id ?? null;
    }

    if (!appUserId) {
      return NextResponse.json(
        { error: "Could not resolve app user from checkout session" },
        { status: 404 },
      );
    }

    const matchedUser = await findUserById(appUserId);

    if (!matchedUser) {
      return NextResponse.json(
        { error: "Resolved app user does not exist" },
        { status: 404 },
      );
    }

    const usageRow = await upsertUsagePlan(matchedUser.id, "pro");

    return NextResponse.json({
      ok: true,
      userId: matchedUser.id,
      plan: usageRow?.plan ?? "pro",
      usage: usageRow ?? null,
    });
  } catch (error) {
    console.error("Stripe confirm error:", error);
    return NextResponse.json(
      { error: "Failed to confirm Stripe session" },
      { status: 500 },
    );
  }
}
