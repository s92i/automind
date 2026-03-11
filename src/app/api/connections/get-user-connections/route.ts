import { connections } from "@/db/schema";
import { auth, db } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
    .select()
    .from(connections)
    .where(eq(connections.user_id, session.user.id));

  const safe = rows.map(
    ({ access_token_enc, refresh_token_enc, ...rest }) => rest,
  );

  return NextResponse.json({ connections: safe });
}
