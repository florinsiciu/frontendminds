import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/ui/section";
import { LeadCard } from "@/components/admin/lead-card";
import type {
  DimensionPercentages,
  LeadBucket,
  QualifyingAnswers,
  ScoredAnswers,
  SeesawScript,
  TierId,
  TriggeredPattern,
} from "@/types/assessment";

export const metadata: Metadata = {
  title: "Sales Prep — Leads Dashboard",
  robots: { index: false },
};

interface AssessmentRow {
  id: string;
  total_percentage: number;
  dimension_percentages: DimensionPercentages;
  tier: TierId;
  answers: ScoredAnswers;
  qualifying_answers: QualifyingAnswers;
  triggered_patterns: TriggeredPattern[] | null;
  top_patterns: TriggeredPattern[] | null;
  lead_score: number | null;
  lead_bucket: LeadBucket | null;
  seesaw_data: SeesawScript | null;
  completed_at: string;
  leads: {
    first_name: string;
    email: string;
  };
}

export default async function LeadsPage() {
  // Simple auth: check for admin key in query or header
  const headersList = await headers();
  const adminKey = process.env.ADMIN_SECRET;

  if (adminKey) {
    const authHeader = headersList.get("x-admin-key");
    // Also check cookie-based auth for browser access
    const cookieHeader = headersList.get("cookie") ?? "";
    const hasAdminCookie = cookieHeader.includes(`admin_key=${adminKey}`);

    if (authHeader !== adminKey && !hasAdminCookie) {
      redirect("/");
    }
  }

  const supabase = await createClient();

  const { data: assessments, error } = await supabase
    .from("assessments")
    .select(
      "id, total_percentage, dimension_percentages, tier, answers, qualifying_answers, triggered_patterns, top_patterns, lead_score, lead_bucket, seesaw_data, completed_at, leads(first_name, email)",
    )
    .not("triggered_patterns", "is", null)
    .order("lead_score", { ascending: false, nullsFirst: false })
    .limit(50);

  if (error) {
    return (
      <Section bg="default">
        <p className="text-red-400">Failed to load leads: {error.message}</p>
      </Section>
    );
  }

  const rows = (assessments ?? []) as unknown as AssessmentRow[];

  const bucketCounts = {
    hot: rows.filter((r) => r.lead_bucket === "hot").length,
    warm: rows.filter((r) => r.lead_bucket === "warm").length,
    nurture: rows.filter((r) => r.lead_bucket === "nurture").length,
  };

  return (
    <Section bg="default">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Sales Prep Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          {rows.length} assessed lead{rows.length !== 1 ? "s" : ""} with
          diagnostic data
        </p>

        {/* Bucket summary */}
        <div className="mt-4 flex gap-4">
          <span className="rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-sm text-red-400">
            {bucketCounts.hot} hot
          </span>
          <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-sm text-amber-400">
            {bucketCounts.warm} warm
          </span>
          <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-sm text-blue-400">
            {bucketCounts.nurture} nurture
          </span>
        </div>

        {/* Lead cards */}
        <div className="mt-8 space-y-6">
          {rows.map((row) => (
            <LeadCard
              key={row.id}
              lead={{
                id: row.id,
                firstName: row.leads.first_name,
                email: row.leads.email,
                completedAt: row.completed_at,
                totalPercentage: row.total_percentage,
                tier: row.tier,
                dimensionPercentages: row.dimension_percentages,
                qualifyingAnswers: row.qualifying_answers,
                answers: row.answers,
                triggeredPatterns: row.triggered_patterns ?? [],
                topPatterns: row.top_patterns ?? [],
                leadScore: row.lead_score ?? 0,
                leadBucket: row.lead_bucket ?? "nurture",
                seesawData: row.seesaw_data ?? {
                  strongestDimension: { id: "migration_health", label: "Migration & Version Health", percentage: 0 },
                  weakestDimension: { id: "delivery_readiness", label: "Delivery & Talent Readiness", percentage: 0 },
                  openingLine: "",
                  pivotLine: "",
                },
              }}
            />
          ))}

          {rows.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No leads with diagnostic data yet. Leads will appear here after
              someone completes the assessment.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
