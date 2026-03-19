import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const redirectTo = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/reset-password`;

    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to send reset email",
      },
      { status: 500 },
    );
  }
}
