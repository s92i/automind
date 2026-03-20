"use server";

import { usage } from "@/db/schema";
import { db } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

const fetchUsage = async ({ user_id }: { user_id: string }) => {
  const rows = await db
    .select()
    .from(usage)
    .where(eq(usage.user_id, user_id))
    .orderBy(desc(usage.updated_at))
    .limit(1);

  console.log("fetchUsage result", {
    user_id,
    row: rows[0] ?? null,
  });

  return rows[0] ?? null;
};

export default fetchUsage;
