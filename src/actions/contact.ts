"use server";

import { z } from "zod/v3";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config/site";

// ─── Validation Schema ────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").max(320),
  reason: z.enum(["general", "service", "speaking", "partnership"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  website: z.string().optional(),
  _t: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult =
  | { success: true }
  | { success: false; error: string };

// ─── Rate Limiting ───────────────────────────────────────────────────────────

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MIN_SUBMIT_TIME_MS = 3000;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt <= now) rateLimitMap.delete(key);
  }

  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// ─── Server Action ────────────────────────────────────────────────────────────

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  // 1. Validate input
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data.",
    };
  }

  const { name, email, reason, message, website, _t } = parsed.data;

  // 2. Honeypot check — bots fill hidden fields
  if (website) return { success: true };

  // 3. Timing check — humans take >3s to fill a form
  if (_t && Date.now() - _t < MIN_SUBMIT_TIME_MS) return { success: true };

  // 4. Rate limiting by IP
  const reqHeaders = await headers();
  const ip = reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? reqHeaders.get("x-real-ip")
    ?? "unknown";
  if (!checkRateLimit(ip)) {
    return { success: false, error: "Too many submissions. Please try again later." };
  }

  // 5. Insert into Supabase
  const supabase = await createClient();
  const { error: dbError } = await supabase.from("contact_submissions").insert({
    name,
    email,
    reason,
    message,
  });

  if (dbError) {
    console.error("Failed to save contact submission:", dbError);
    return { success: false, error: "Failed to save your message. Please try again." };
  }

  // 6. Send notification email (non-blocking)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    resend.emails
      .send({
        from: `${siteConfig.name} <contact@frontendminds.com>`,
        to: "contact@frontendminds.com",
        subject: `New contact: ${reason} from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      })
      .catch((err) => console.error("Contact notification email failed:", err));
  }

  return { success: true };
}
