import "server-only";

import { Resend } from "resend";
import * as React from "react";
import type { TierId } from "@/types/assessment";
import { followUpDay3, followUpDay7 } from "@/lib/content/followup-emails";
import { FollowUpEmail } from "@/lib/email/followup-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendFollowUpEmail(params: {
  to: string;
  firstName: string;
  tier: TierId;
  resultId: string;
  dayIndex: 3 | 7;
}): Promise<{ id: string } | null> {
  const content =
    params.dayIndex === 3
      ? followUpDay3[params.tier]
      : followUpDay7[params.tier];

  const { data, error } = await resend.emails.send({
    from: "FrontendMinds <contact@frontendminds.com>",
    to: params.to,
    subject: content.subject,
    react: React.createElement(FollowUpEmail, {
      firstName: params.firstName,
      tier: params.tier,
      resultId: params.resultId,
      dayIndex: params.dayIndex,
    }),
  });

  if (error) {
    console.error(
      `Failed to send follow-up email (day ${params.dayIndex}):`,
      error,
    );
    return null;
  }

  return data;
}
