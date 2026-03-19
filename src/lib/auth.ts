import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "@/db/auth.schema";
import { nextCookies } from "better-auth/next-js";
import { EmailService } from "@/services/emailService";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const auth = betterAuth({
  baseURL: appUrl,
  trustedOrigins: [appUrl],

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: authSchema.user,
      session: authSchema.session,
      account: authSchema.account,
      verification: authSchema.verification,
    },
  }),

  secret: process.env.BETTER_AUTH_SECRET!,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      const finalUrl = url.startsWith("http") ? url : `${appUrl}${url}`;

      void EmailService.sendPasswordResetEmail({
        to: user.email,
        name: user.name,
        url: finalUrl,
      });
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password reset completed for ${user.email}`);
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const finalUrl = url.startsWith("http") ? url : `${appUrl}${url}`;

      void EmailService.sendVerificationEmail({
        to: user.email,
        name: user.name,
        url: finalUrl,
      });
    },
  },

  passwords: {
    minLength: 8,
    bcryptRounds: 12,
  },

  sessions: {
    cookieName: "fx_session",
    cookieSecure: true,
    ttl: 60 * 60 * 24 * 30,
  },

  plugins: [nextCookies()],
});
