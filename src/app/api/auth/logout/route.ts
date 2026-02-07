import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await auth.api.signOut({ headers: req.headers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
