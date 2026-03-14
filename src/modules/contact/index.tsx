"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const Contact = () => {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [website, setWebsite] = useState("");
  const [startedAt] = useState(() => Date.now());

  const [captchaToken, setCaptchaToken] = useState("");
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string | null>(
    null,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const canSubmit = useMemo(() => {
    return Boolean(name && email && message && captchaToken && !isSubmitting);
  }, [name, email, message, captchaToken, isSubmitting]);

  useEffect(() => {
    if (
      !turnstileLoaded ||
      !window.turnstile ||
      !siteKey ||
      turnstileWidgetId
    ) {
      return;
    }

    const el = document.getElementById("turnstile-container");
    if (!el) return;

    const id = window.turnstile.render(el, {
      sitekey: siteKey,
      theme: "auto",
      callback: (token) => {
        setCaptchaToken(token);
        setError("");
      },
      "expired-callback": () => {
        setCaptchaToken("");
      },
      "error-callback": () => {
        setCaptchaToken("");
        setError("Captcha error. Please try again.");
      },
    });

    setTurnstileWidgetId(id);
  }, [turnstileLoaded, siteKey, turnstileWidgetId]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
    setWebsite("");
    setCaptchaToken("");

    if (window.turnstile && turnstileWidgetId) {
      window.turnstile.reset(turnstileWidgetId);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          website,
          captchaToken,
          startedAt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || "Something went wrong. Please try again.");
        if (window.turnstile && turnstileWidgetId) {
          window.turnstile.reset(turnstileWidgetId);
        }
        setCaptchaToken("");
        return;
      }

      setContactId(data.contactId);
      resetForm();
    } catch {
      setError("Unable to send your message right now.");
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
      setCaptchaToken("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setTurnstileLoaded(true)}
      />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_30%)]" />

      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 animate-fade-in">
          <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Contact us
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl bg-gradient-primary bg-clip-text text-transparent">
            Talk to Our Team
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base md:text-lg">
            Tell us about your workflows and we&apos;ll help you design the
            right automation setup for Automind.
          </p>
        </div>

        <div className="animate-fade-in overflow-hidden rounded-3xl border border-border/60 bg-background/70 shadow-xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="border-b border-border/60 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="max-w-md">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  Let&apos;s build something efficient
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                  Share your current process, pain points, or ideas. We&apos;ll
                  help you find the simplest way to automate it.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">Fast response</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Usually within 1 business day.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">Protected form</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Anti-spam protections and captcha enabled.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                    <p className="text-sm font-medium">
                      Built for your use case
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      From internal operations to client-facing automations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Work email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      className="h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-foreground"
                  >
                    Company
                  </label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    How can we help?
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Describe your current workflows and what you want to automate..."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    required
                    className="min-h-[160px] resize-none rounded-xl sm:min-h-[190px]"
                  />
                </div>

                <div className="space-y-3">
                  <div
                    id="turnstile-container"
                    className="min-h-[65px] rounded-xl border border-dashed border-border/70 bg-muted/20 p-2"
                  />

                  {error ? (
                    <p className="text-sm text-destructive">{error}</p>
                  ) : (
                    <p className="text-xs leading-5 text-muted-foreground">
                      Protected by captcha and anti-spam validation.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-muted-foreground sm:text-sm">
                    Your message will be sent directly to our inbox.
                  </p>

                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-6 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Sending..." : "Send message"}
                  </Button>
                </div>
              </form>

              {contactId && (
                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Message sent successfully
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                          We&apos;ve received your request and will get back to
                          you soon.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-background/80 px-3 py-2 text-xs text-muted-foreground sm:text-right">
                      <span className="block">Contact ID</span>
                      <span className="font-mono font-semibold text-foreground">
                        {contactId}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
