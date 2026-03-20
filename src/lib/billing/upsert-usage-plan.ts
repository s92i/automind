import { usage } from "@/db/schema";
import { db } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function upsertUsagePlan(userId: string, plan: "free" | "pro") {
  const existing = await db
    .select()
    .from(usage)
    .where(eq(usage.user_id, userId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(usage)
      .set({
        plan,
        usage_limit: plan === "pro" ? 10000 : 1000,
        updated_at: new Date(),
      })
      .where(eq(usage.user_id, userId));
  } else {
    await db.insert(usage).values({
      user_id: userId,
      plan,
      usage_limit: plan === "pro" ? 10000 : 1000,
      usage: 0,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  const after = await db
    .select()
    .from(usage)
    .where(eq(usage.user_id, userId))
    .limit(1);

  console.log("upsertUsagePlan result", {
    userId,
    plan,
    row: after[0] ?? null,
  });

  return after[0] ?? null;
}
