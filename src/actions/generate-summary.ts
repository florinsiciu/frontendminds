"use server";

import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

export type GenerateSummaryResult =
  | { success: true; shareToken: string }
  | { success: false; error: string };

export async function generateSummary(
  assessmentId: string,
): Promise<GenerateSummaryResult> {
  if (!assessmentId) {
    return { success: false, error: "Assessment ID is required." };
  }

  const supabase = await createClient();

  // Check if a summary already exists for this assessment
  const { data: existing } = await supabase
    .from("executive_summaries")
    .select("share_token")
    .eq("assessment_id", assessmentId)
    .single();

  if (existing) {
    return { success: true, shareToken: existing.share_token };
  }

  // Verify the assessment exists
  const { data: assessment } = await supabase
    .from("assessments")
    .select("id")
    .eq("id", assessmentId)
    .single();

  if (!assessment) {
    return { success: false, error: "Assessment not found." };
  }

  // Generate a unique share token
  const shareToken = crypto.randomBytes(16).toString("hex");

  const { error } = await supabase.from("executive_summaries").insert({
    assessment_id: assessmentId,
    share_token: shareToken,
  });

  if (error) {
    console.error("Failed to create executive summary:", error);
    return { success: false, error: "Failed to generate summary." };
  }

  return { success: true, shareToken };
}
