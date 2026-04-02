import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendNurtureEmail } from "@/lib/email/send-nurture";
import { NURTURE_SCHEDULE_DAYS } from "@/lib/content/nurture-emails";

// Use direct Supabase client (no cookies needed for cron)
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

  // Fetch all incomplete nurture queue entries
  const { data: queue, error: fetchError } = await supabase
    .from("nurture_queue")
    .select("*")
    .eq("completed", false)
    .limit(50);

  if (fetchError) {
    console.error("Failed to fetch nurture queue:", fetchError);
    return NextResponse.json(
      { error: "Failed to fetch queue" },
      { status: 500 },
    );
  }

  if (!queue || queue.length === 0) {
    return NextResponse.json({ sent: 0, message: "No pending emails" });
  }

  for (const entry of queue) {
    const subscribedAt = new Date(entry.subscribed_at);
    const daysSinceSubscribe = Math.floor(
      (now.getTime() - subscribedAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Determine which email index they should have received by now
    let targetIndex = 0;
    for (let i = NURTURE_SCHEDULE_DAYS.length - 1; i >= 0; i--) {
      if (daysSinceSubscribe >= NURTURE_SCHEDULE_DAYS[i]) {
        targetIndex = i + 1; // They should have received emails 0 through i
        break;
      }
    }

    // Skip email 0 — it's sent immediately at subscribe time
    const nextToSend = entry.emails_sent;
    if (nextToSend < 1) continue; // Email 0 not sent yet (shouldn't happen)
    if (nextToSend >= targetIndex) continue; // Already caught up
    if (nextToSend >= NURTURE_SCHEDULE_DAYS.length) {
      // All emails sent — mark complete
      await supabase
        .from("nurture_queue")
        .update({ completed: true })
        .eq("id", entry.id);
      continue;
    }

    // Send the next email in sequence
    const result = await sendNurtureEmail({
      to: entry.email,
      firstName: entry.first_name ?? "",
      emailIndex: nextToSend,
    });

    if (result) {
      await supabase
        .from("nurture_queue")
        .update({
          emails_sent: nextToSend + 1,
          last_sent_at: now.toISOString(),
          ...(nextToSend + 1 >= NURTURE_SCHEDULE_DAYS.length && {
            completed: true,
          }),
        })
        .eq("id", entry.id);
      sent++;
    } else {
      errors++;
    }
  }

  return NextResponse.json({ sent, errors, processed: queue.length });
}
