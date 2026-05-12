import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TIER_MAP } from "@/lib/config/scoring";
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

interface ResultsRow {
  id: string;
  total_percentage: number;
  dimension_percentages: DimensionPercentages;
  tier: TierId;
  top_patterns: TriggeredPattern[] | null;
  triggered_patterns: TriggeredPattern[] | null;
}

async function getAssessment(id: string): Promise<ResultsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assessments")
    .select("id, total_percentage, dimension_percentages, tier, top_patterns, triggered_patterns")
    .eq("id", id)
    .single<ResultsRow>();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getAssessment(id);

  if (!data) {
    return { title: "Results Not Found | FrontendMinds" };
  }

  const tier = TIER_MAP[data.tier];
  const title = `Angular Modernization Score: ${data.total_percentage}% — ${tier.label}`;
  const description = `Scored ${data.total_percentage}% across 5 modernization dimensions. ${tier.shortDiagnosis}`;

  return {
    title: `${title} | FrontendMinds`,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ShareableResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getAssessment(id);

  if (!data) {
    redirect("/assessment");
  }

  return (
    <>
      <TrackResultsView tier={data.tier} totalPercentage={data.total_percentage} />

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
