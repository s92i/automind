import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = String(body.token || "");
    const newPassword = String(body.password || "");

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Invalid or expired reset link" },
      { status: 400 },
    );
  }
}
