"use server";

import { db } from "@/lib/auth";
import { executeWorkflow } from "@/utils/workflows/workflowEngine";
import { eq, sql } from "drizzle-orm";

const { usage: usageTable } = await import("@/db/schema");

export const testWorkflow = async ({ workflowData, user }: any) => {
  try {
    const nodes = Array.isArray(workflowData?.nodes) ? workflowData.nodes : [];
    const edges = Array.isArray(workflowData?.edges) ? workflowData.edges : [];

    if (!nodes.length) {
      return { ok: false, error: "No nodes provided for workflow" };
    }

    try {
      if (user?.id) {
        const [row] = await db
          .select()
          .from(usageTable)
          .where(eq(usageTable.user_id, user.id))
          .limit(1);

        if (!row) {
          await db.insert(usageTable).values({
            user_id: user.id,
            plan: "free",
            usage_limit: 1000,
            usage: 0,
          });
        } else {
          const desiredLimit = row.plan === "pro" ? 10000 : 1000;
          if (row.usage_limit !== desiredLimit) {
            await db
              .update(usageTable)
              .set({ usage_limit: desiredLimit, updated_at: sql`now()` })
              .where(eq(usageTable.user_id, user.id));
          }

          if ((row.usage ?? 0) >= (row.usage_limit ?? desiredLimit)) {
            return {
              ok: false,
              error: "Usage limit exceeded. Please update your plan",
            };
          }
        }
      }
    } catch (error) {
      console.log("error");
    }

    const result = await executeWorkflow(nodes, edges, {
      stopIfEmptyTriggerProviders: ["gmail", "slack", "discord"],
    });
    return result;
  } catch (error: any) {
    console.log("error");
    console.error("testWorkflow error:", error);
    return { ok: false, error: error?.message || "Failed to test workflow" };
  } finally {
    try {
      if (user?.id) {
        const [row] = await db
          .select()
          .from(usageTable)
          .where(eq(usageTable.user_id, user.id))
          .limit(1);

        if (!row) {
          await db.insert(usageTable).values({
            user_id: user.id,
            plan: "free",
            usage_limit: 1000,
            usage: 1,
          });
        } else {
          await db
            .update(usageTable)
            .set({
              usage: sql`${usageTable.usage} + ${1}`,
              updated_at: sql`now()`,
            })
            .where(eq(usageTable.user_id, user.id));
        }
      }
    } catch (error) {
      console.log("error");
    }
  }
};
