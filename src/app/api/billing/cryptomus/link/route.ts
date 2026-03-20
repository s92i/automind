import { cryptomusClient } from "@/lib/cryptomus";

export async function POST(req: Request) {
  try {
    const { amount, currency, user_id } = await req.json();

    if (!amount || !currency || !user_id) {
      return Response.json(
        { error: "Missing amount, currency, or user_id" },
        { status: 400 },
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;

    const payload = {
      amount: String(amount),
      currency: String(currency).toUpperCase(),
      order_id: `pro-${user_id}-${Date.now()}`.replace(/[^a-zA-Z0-9_-]/g, "-"),
      url_return: `${baseUrl}/dashboard/billing?success=true`,
      url_callback: `${baseUrl}/api/webhooks/cryptomus`,
    };

    console.log("Cryptomus payload:", payload);

    const payment = await cryptomusClient.payments.create(payload);

    if (!payment?.url) {
      return Response.json(
        { error: "No payment URL returned by Cryptomus" },
        { status: 502 },
      );
    }

    return Response.json({ url: payment.url }, { status: 200 });
  } catch (error: any) {
    console.error("Cryptomus error:", error);
    console.error("Cryptomus error response:", error?.response);
    console.error("Cryptomus error data:", error?.response?.data);

    return Response.json(
      { error: error?.message || "Failed to create Cryptomus payment link" },
      { status: 500 },
    );
  }
}
