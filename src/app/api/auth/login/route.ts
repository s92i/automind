import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password } = body;

  try {
    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return NextResponse.json({ message: "Logged in", session });
  } catch (error: any) {
    if (
      error.message &&
      error.message.includes("email") &&
      error.message.includes("verify")
    ) {
      return NextResponse.json(
        {
          error:
            "Please verify your email address before logging in. Check your email for the verification link",
        },
        { status: 403 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
