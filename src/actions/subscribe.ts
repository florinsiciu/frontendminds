"use server";

import { z } from "zod/v3";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { sendNurtureEmail } from "@/lib/email/send-nurture";

const subscribeSchema = z.object({
  firstName: z.string().max(100).optional(),
  email: z.string().email("Invalid email address").max(320),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubscribeResult =
  | { success: true }
  | { success: false; error: string };

export async function subscribe(input: SubscribeInput): Promise<SubscribeResult> {
  const parsed = subscribeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    console.error("RESEND_AUDIENCE_ID is not set");
    return { success: false, error: "Newsletter signup is temporarily unavailable." };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.contacts.create({
      audienceId,
      email: parsed.data.email,
      firstName: parsed.data.firstName ?? "",
    });
  } catch (error) {
    console.error("Failed to add newsletter subscriber:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  // Send welcome nurture email (Day 0) — non-blocking
  sendNurtureEmail({
    to: parsed.data.email,
    firstName: parsed.data.firstName ?? "",
    emailIndex: 0,
  }).catch((err) => console.error("Welcome nurture email failed:", err));

  // Add to nurture queue for follow-up emails — non-blocking
  const supabase = await createClient();
  supabase
    .from("nurture_queue")
    .insert({
      email: parsed.data.email,
      first_name: parsed.data.firstName ?? "",
      emails_sent: 1, // Email 0 sent immediately above
    })
    .then(({ error }) => {
      if (error) console.error("Failed to add to nurture queue:", error);
    });

  return { success: true };
}
