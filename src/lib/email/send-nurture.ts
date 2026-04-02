import "server-only";

import { Resend } from "resend";
import * as React from "react";
import { nurtureEmails } from "@/lib/content/nurture-emails";
import { NurtureEmail } from "@/lib/email/nurture-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNurtureEmail(params: {
  to: string;
  firstName: string;
  emailIndex: number;
}): Promise<{ id: string } | null> {
  const template = nurtureEmails[params.emailIndex];
  if (!template) return null;

  const { data, error } = await resend.emails.send({
    from: "FrontendMinds <newsletter@frontendminds.com>",
    to: params.to,
    subject: template.subject,
    react: React.createElement(NurtureEmail, {
      firstName: params.firstName,
      heading: template.heading,
      preheader: template.preheader,
      body: template.body,
      cta: template.cta,
      closing: template.closing,
    }),
  });

  if (error) {
    console.error(`Failed to send nurture email #${params.emailIndex}:`, error);
    return null;
  }

  return data;
}
