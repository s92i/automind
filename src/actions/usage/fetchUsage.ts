"use server";

import { usage } from "@/db/schema";
import { db } from "@/lib/auth";
import { eq } from "drizzle-orm";

const fetchUsage = async ({ user_id }: { user_id: string }) => {
  const rows = await db
    .select()
    .from(usage)
    .where(eq(usage.user_id, user_id))
    .limit(1);

  return rows[0] ?? null;
};

export default fetchUsage;
