import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

  const { count, error } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json(
      { status: "error", error: error.message, timestamp: new Date().toISOString() },
      { status: 500 },
    );
  }

  return NextResponse.json({
    status: "ok",
    leads: count,
    timestamp: new Date().toISOString(),
  });
}
