"use server";

import { z } from "zod/v3";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config/site";

// ─── Validation Schema ────────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email address").max(320),
  reason: z.enum(["general", "service", "speaking", "partnership"]),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactResult =
  | { success: true }
  | { success: false; error: string };

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

  const { name, email, reason, message } = parsed.data;

  // 2. Insert into Supabase
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

  // 3. Send notification email to Florin (non-blocking)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    const resend = new Resend(resendApiKey);
    resend.emails
      .send({
        from: `${siteConfig.name} <contact@frontendminds.com>`,
        to: "florin@frontendminds.com",
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
