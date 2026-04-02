import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Section } from "@/components/ui/section";
import { ExecutiveSummary } from "@/components/results/executive-summary";
import type { DimensionPercentages, TriggeredPattern } from "@/types/assessment";

export const metadata: Metadata = {
  title: "Executive Summary — Angular Modernization Assessment",
  description:
    "Shareable executive summary of your Angular modernization assessment results.",
  robots: { index: false },
};

interface SummaryRow {
  assessment_id: string;
  assessments: {
    total_percentage: number;
    dimension_percentages: DimensionPercentages;
    top_patterns: TriggeredPattern[] | null;
    lead_id: string;
    leads: {
      first_name: string;
    };
  };
}

export default async function SummaryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { token, id } = await searchParams;

  const supabase = await createClient();

  // Support both token-based (shared link) and id-based (direct from results) access
  let assessmentData: {
    totalPercentage: number;
    dimensionPercentages: DimensionPercentages;
    topPatterns: TriggeredPattern[];
    firstName: string;
  } | null = null;

  if (token && typeof token === "string") {
    // Token-based access (shared link)
    const { data, error } = await supabase
      .from("executive_summaries")
      .select(
        "assessment_id, assessments(total_percentage, dimension_percentages, top_patterns, lead_id, leads(first_name))",
      )
      .eq("share_token", token)
      .single<SummaryRow>();

    if (!error && data?.assessments) {
      assessmentData = {
        totalPercentage: data.assessments.total_percentage,
        dimensionPercentages: data.assessments.dimension_percentages,
        topPatterns: data.assessments.top_patterns ?? [],
        firstName: data.assessments.leads?.first_name ?? "Your",
      };
    }
  } else if (id && typeof id === "string") {
    // Direct access from results page (before share token is created)
    const { data, error } = await supabase
      .from("assessments")
      .select(
        "total_percentage, dimension_percentages, top_patterns, lead_id, leads(first_name)",
      )
      .eq("id", id)
      .single();

    if (!error && data) {
      const lead = data.leads as unknown as { first_name: string } | null;
      assessmentData = {
        totalPercentage: data.total_percentage,
        dimensionPercentages: data.dimension_percentages as DimensionPercentages,
        topPatterns: (data.top_patterns as TriggeredPattern[] | null) ?? [],
        firstName: lead?.first_name ?? "Your",
      };
    }
  }

  if (!assessmentData) {
    redirect("/assessment");
  }

  return (
    <Section bg="default">
      <ExecutiveSummary
        totalPercentage={assessmentData.totalPercentage}
        dimensionPercentages={assessmentData.dimensionPercentages}
        topPatterns={assessmentData.topPatterns}
        firstName={assessmentData.firstName}
      />
    </Section>
  );
}
