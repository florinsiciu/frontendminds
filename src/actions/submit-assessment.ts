"use server";

import { z } from "zod/v3";
import type { ScoredAnswers, QualifyingAnswers } from "@/types/assessment";
import { createClient } from "@/lib/supabase/server";
import { scoreAssessment } from "@/lib/scoring";
import { sendResultsEmail } from "@/lib/email";

// ─── Input Validation ──────────────────────────────────────────────────────

const scoredAnswerSchema = z.record(
  z.string().regex(/^q([1-9]|1\d|20)$/),
  z.boolean(),
);

const qualifyingAnswerSchema = z.object({
  role: z.string().min(1),
  planning: z.string().min(1),
});

const submissionSchema = z.object({
  firstName: z.string().min(1).max(100),
  email: z.string().email().max(320),
  scoredAnswers: scoredAnswerSchema.refine(
    (obj) => Object.keys(obj).length === 20,
    "All 20 questions must be answered",
  ),
  qualifyingAnswers: qualifyingAnswerSchema,
  utmSource: z.string().nullish(),
  utmMedium: z.string().nullish(),
  utmCampaign: z.string().nullish(),
});

export type SubmitAssessmentInput = z.infer<typeof submissionSchema>;

export type SubmitAssessmentResult =
  | { success: true; resultId: string }
  | { success: false; error: string };

// ─── Server Action ─────────────────────────────────────────────────────────

export async function submitAssessment(
  input: SubmitAssessmentInput,
): Promise<SubmitAssessmentResult> {
  // 1. Validate input
  const parsed = submissionSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Invalid submission data." };
  }

  const {
    firstName,
    email,
    scoredAnswers,
    qualifyingAnswers,
    utmSource,
    utmMedium,
    utmCampaign,
  } = parsed.data;

  const supabase = await createClient();

  // 2. Create or find lead (upsert by email)
  const { data: existingLead } = await supabase
    .from("leads")
    .select("id")
    .eq("email", email)
    .single();

  let leadId: string;

  if (existingLead) {
    leadId = existingLead.id;
  } else {
    const { data: newLead, error: leadError } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        email,
        utm_source: utmSource ?? null,
        utm_medium: utmMedium ?? null,
        utm_campaign: utmCampaign ?? null,
      })
      .select("id")
      .single();

    if (leadError || !newLead) {
      console.error("Failed to create lead:", leadError);
      return { success: false, error: "Failed to save your information." };
    }

    leadId = newLead.id;
  }

  // 3. Score the assessment (server-side only)
  const { totalPercentage, dimensionPercentages, tier } = scoreAssessment(
    scoredAnswers as ScoredAnswers,
  );

  // 4. Store the assessment
  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .insert({
      lead_id: leadId,
      answers: scoredAnswers,
      qualifying_answers: qualifyingAnswers as QualifyingAnswers,
      total_percentage: totalPercentage,
      dimension_percentages: dimensionPercentages,
      tier,
    })
    .select("id")
    .single();

  if (assessmentError || !assessment) {
    console.error("Failed to create assessment:", assessmentError);
    return { success: false, error: "Failed to save your assessment." };
  }

  // 5. Trigger results email (non-blocking — don't fail the submission if email fails)
  const emailResult = await sendResultsEmail({
    to: email,
    firstName,
    totalPercentage,
    dimensionPercentages,
    tier,
    resultId: assessment.id,
  });

  if (emailResult) {
    await supabase
      .from("assessments")
      .update({ email_sent_at: new Date().toISOString() })
      .eq("id", assessment.id);

    await supabase.from("email_events").insert({
      assessment_id: assessment.id,
      resend_id: emailResult.id,
      type: "results",
      status: "sent",
    });
  }

  // 6. Return result ID for redirect to results page
  return { success: true, resultId: assessment.id };
}
