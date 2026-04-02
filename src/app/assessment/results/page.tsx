import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { pageSeo } from "@/lib/content/seo";
import type { DimensionPercentages, TierId, TriggeredPattern } from "@/types/assessment";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";
import { ScoreOverview } from "@/components/results/score-overview";
import { DimensionBars } from "@/components/results/dimension-bars";
import { KeyFindings } from "@/components/results/key-findings";
import { PatternAwareCta } from "@/components/results/pattern-aware-cta";
import { TrackResultsView } from "@/components/results/track-view";
import { resultsPage } from "@/lib/content/results";

export const metadata: Metadata = {
  title: pageSeo.results.title,
  description: pageSeo.results.description,
  robots: { index: false },
};

interface ResultsRow {
  id: string;
  total_percentage: number;
  dimension_percentages: DimensionPercentages;
  tier: TierId;
  top_patterns: TriggeredPattern[] | null;
  triggered_patterns: TriggeredPattern[] | null;
}

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (!id || typeof id !== "string") {
    redirect("/assessment");
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assessments")
    .select("id, total_percentage, dimension_percentages, tier, top_patterns, triggered_patterns")
    .eq("id", id)
    .single<ResultsRow>();

  if (error || !data) {
    redirect("/assessment");
  }

  return (
    <>
      <TrackResultsView tier={data.tier} totalPercentage={data.total_percentage} />

      {/* Section 1 — Score */}
      <Section bg="muted">
        <Reveal>
          <Tagline>Your Results</Tagline>
          <h1 className="font-heading text-3xl font-bold">
            Angular Modernization{" "}
            <em className="not-italic font-heading text-indigo-400">Score</em>
          </h1>
          <p className="mt-2 text-muted-foreground">{resultsPage.subtitle}</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6">
            <ScoreOverview totalPercentage={data.total_percentage} tier={data.tier} />
            <DimensionBars dimensionPercentages={data.dimension_percentages} />
          </div>
        </Reveal>
      </Section>

      {/* Section 2 — Key Findings */}
      {data.top_patterns && data.top_patterns.length > 0 && (
        <Section bg="default">
          <Reveal>
            <Tagline>Key Findings</Tagline>
            <KeyFindings
              topPatterns={data.top_patterns}
              isStrongPosition={
                !data.triggered_patterns?.some(
                  (tp) =>
                    tp.pattern.priority === "critical" ||
                    tp.pattern.priority === "warning",
                )
              }
              assessmentId={data.id}
            />
          </Reveal>
        </Section>
      )}

      {/* Section 3 — CTA */}
      <Section bg="muted">
        <Reveal>
          <PatternAwareCta
            topPatterns={data.top_patterns ?? []}
            assessmentId={data.id}
          />
        </Reveal>
      </Section>
    </>
  );
}
