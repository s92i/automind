import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const company = String(body?.company || "").trim();
    const message = String(body?.message || "").trim();
    const website = String(body?.website || "").trim();
    const captchaToken = String(body?.captchaToken || "").trim();
    const startedAt = Number(body?.startedAt || 0);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha is required." },
        { status: 400 },
      );
    }

    if (website) {
      return NextResponse.json({ error: "Spam detected." }, { status: 400 });
    }

    const elapsed = Date.now() - startedAt;

    if (!startedAt || elapsed < 3000) {
      return NextResponse.json(
        { error: "Submission blocked." },
        { status: 400 },
      );
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return NextResponse.json(
        { error: "Captcha server configuration is missing." },
        { status: 500 },
      );
    }

    const formData = new FormData();
    formData.append("secret", turnstileSecret);
    formData.append("response", captchaToken);

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "";
    if (ip) {
      formData.append("remoteip", ip);
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      },
    );

    const verificationData =
      (await verificationResponse.json()) as TurnstileResponse;

    if (!verificationData.success) {
      return NextResponse.json(
        { error: "Captcha verification failed." },
        { status: 400 },
      );
    }

    const gmailUser = process.env.SMTP_USER;
    const gmailPass = process.env.SMTP_PASS;

    if (!gmailUser || !gmailPass) {
      return NextResponse.json(
        { error: "Mail server configuration is missing." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const contactId = `CNT-${Date.now().toString(36).toUpperCase()}`;

    const text = [
      `New contact form submission`,
      ``,
      `Contact ID: ${contactId}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "N/A"}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2 style="margin: 0 0 16px;">New contact form submission</h2>
        <p><strong>Contact ID:</strong> ${contactId}</p>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "N/A")}</p>
        <div style="margin-top: 20px;">
          <p><strong>Message:</strong></p>
          <div style="white-space: pre-wrap; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #f9fafb;">
            ${escapeHtml(message)}
          </div>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Automind Contact Form" <${gmailUser}>`,
      to: "automind.app@gmail.com",
      replyTo: email,
      subject: `New Automind contact request — ${name}`,
      text,
      html,
    });

    return NextResponse.json({
      ok: true,
      contactId,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to process the contact request." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
