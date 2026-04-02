import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendFollowUpEmail } from "@/lib/email/send-followup";
import type { TierId } from "@/types/assessment";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabase();
  const now = new Date();
  let sent = 0;
  let errors = 0;

  // Fetch assessments completed in the last 14 days that haven't booked a call
  const fourteenDaysAgo = new Date(
    now.getTime() - 14 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: assessments, error: fetchError } = await supabase
    .from("assessments")
    .select("id, lead_id, tier, created_at, booked_call, leads(email, first_name)")
    .eq("booked_call", false)
    .gte("created_at", fourteenDaysAgo)
    .limit(50);

  if (fetchError) {
    console.error("Failed to fetch assessments:", fetchError);
    return NextResponse.json(
      { error: "Failed to fetch assessments" },
      { status: 500 },
    );
  }

  if (!assessments || assessments.length === 0) {
    return NextResponse.json({ sent: 0, message: "No pending follow-ups" });
  }

  for (const assessment of assessments) {
    const createdAt = new Date(assessment.created_at);
    const daysSince = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    const lead = assessment.leads as unknown as {
      email: string;
      first_name: string;
    } | null;
    if (!lead) continue;

    // Check which follow-ups have already been sent
    const { data: sentEvents } = await supabase
      .from("email_events")
      .select("type")
      .eq("assessment_id", assessment.id)
      .in("type", ["followup_day3", "followup_day7"]);

    const sentTypes = new Set(sentEvents?.map((e) => e.type) ?? []);

    // Determine which follow-up to send
    let dayIndex: 3 | 7 | null = null;
    if (daysSince >= 3 && !sentTypes.has("followup_day3")) {
      dayIndex = 3;
    } else if (daysSince >= 7 && !sentTypes.has("followup_day7")) {
      dayIndex = 7;
    }

    if (!dayIndex) continue;

    const result = await sendFollowUpEmail({
      to: lead.email,
      firstName: lead.first_name,
      tier: assessment.tier as TierId,
      resultId: assessment.id,
      dayIndex,
    });

    if (result) {
      await supabase.from("email_events").insert({
        assessment_id: assessment.id,
        resend_id: result.id,
        type: `followup_day${dayIndex}`,
        status: "sent",
      });
      sent++;
    } else {
      errors++;
    }
  }

  return NextResponse.json({ sent, errors, processed: assessments.length });
}
