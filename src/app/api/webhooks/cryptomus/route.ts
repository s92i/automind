import { user } from "@/db/auth.schema";
import { usage } from "@/db/schema";
import { db } from "@/lib/auth";
import { cryptomusClient } from "@/lib/cryptomus";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();

  const isValid = await cryptomusClient.payments.verifyWebhookSignature({
    ipAddress: req.headers.get("x-forwarded-for") || "",
    request: body,
  });

  if (!isValid) {
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 400,
    });
  }

  if (body.status === "paid" && body.user_id) {
    const userData = await db
      .select()
      .from(user)
      .where(eq(user.id, body.user_id as string))
      .limit(1);

    await db
      .update(usage)
      .set({ plan: "pro", usage_limit: 10000 })
      .where(eq(usage.user_id, userData[0]?.id));
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
