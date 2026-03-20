import { user } from "@/db/auth.schema";
import { db } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import Stripe from "stripe";
import { upsertUsagePlan } from "@/lib/billing/upsert-usage-plan";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!stripeWebhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2026-02-25.clover",
});

async function findUserByEmail(email: string | null | undefined) {
  if (!email) return null;

  const rows = await db
    .select()
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  return rows.length ? rows[0] : null;
}

async function resolveUserIdFromCheckoutSession(
  session: Stripe.Checkout.Session,
) {
  if (session.client_reference_id) {
    return session.client_reference_id;
  }

  if (session.metadata?.userId) {
    return session.metadata.userId;
  }

  const email = session.customer_details?.email ?? null;

  if (email) {
    const matchedUser = await findUserByEmail(email);
    if (matchedUser) return matchedUser.id;
  }

  return null;
}

async function resolveUserIdFromInvoice(invoice: Stripe.Invoice) {
  if (invoice.metadata?.userId) {
    return invoice.metadata.userId;
  }

  const invoiceWithParent = invoice as Stripe.Invoice & {
    parent?: {
      subscription_details?: {
        subscription?: string | null;
      };
    };
  };

  const subscriptionId =
    typeof invoiceWithParent.parent?.subscription_details?.subscription ===
    "string"
      ? invoiceWithParent.parent.subscription_details.subscription
      : null;

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (subscription.metadata?.userId) {
      return subscription.metadata.userId;
    }

    const customerId =
      typeof subscription.customer === "string" ? subscription.customer : null;

    if (customerId) {
      const customer = await stripe.customers.retrieve(customerId);

      if ("email" in customer && customer.email) {
        const matchedUser = await findUserByEmail(customer.email);
        if (matchedUser) return matchedUser.id;
      }
    }
  }

  if (invoice.customer_email) {
    const matchedUser = await findUserByEmail(invoice.customer_email);
    if (matchedUser) return matchedUser.id;
  }

  const customerId =
    typeof invoice.customer === "string" ? invoice.customer : null;

  if (customerId) {
    const customer = await stripe.customers.retrieve(customerId);

    if ("email" in customer && customer.email) {
      const matchedUser = await findUserByEmail(customer.email);
      if (matchedUser) return matchedUser.id;
    }
  }

  return null;
}

async function resolveUserIdFromSubscription(
  subscription: Stripe.Subscription,
) {
  if (subscription.metadata?.userId) {
    return subscription.metadata.userId;
  }

  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : null;

  if (customerId) {
    const customer = await stripe.customers.retrieve(customerId);

    if ("email" in customer && customer.email) {
      const matchedUser = await findUserByEmail(customer.email);
      if (matchedUser) return matchedUser.id;
    }
  }

  return null;
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret,
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown webhook signature error";
    console.error("Webhook signature verification failed:", message);
    return new Response(`Webhook Error: ${message}`, { status: 400 });
  }

  try {
    console.log("Received Stripe event:", event.type);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = await resolveUserIdFromCheckoutSession(session);

        if (!userId) {
          console.warn("Could not resolve app user from checkout session", {
            sessionId: session.id,
            client_reference_id: session.client_reference_id,
            metadata: session.metadata,
            email: session.customer_details?.email,
          });
          break;
        }

        await upsertUsagePlan(userId, "pro");
        break;
      }

      case "invoice.paid":
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        const userId = await resolveUserIdFromInvoice(invoice);

        if (!userId) {
          console.warn("Could not resolve app user from invoice event", {
            invoiceId: invoice.id,
            customer_email: invoice.customer_email,
            metadata: invoice.metadata,
          });
          break;
        }

        await upsertUsagePlan(userId, "pro");
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        const userId = await resolveUserIdFromInvoice(invoice);

        if (!userId) {
          console.warn("Could not resolve app user from failed invoice", {
            invoiceId: invoice.id,
          });
          break;
        }

        await upsertUsagePlan(userId, "free");
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const userId = await resolveUserIdFromSubscription(subscription);

        if (!userId) {
          console.warn("Could not resolve app user from deleted subscription", {
            subscriptionId: subscription.id,
          });
          break;
        }

        await upsertUsagePlan(userId, "free");
        break;
      }

      case "invoice_payment.paid": {
        console.log("Ignoring invoice_payment.paid");
        break;
      }

      default: {
        console.log(`Unhandled event type: ${event.type}`);
        break;
      }
    }

    return new Response("Received", { status: 200 });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new Response("Webhook handler error", { status: 500 });
  }
}
