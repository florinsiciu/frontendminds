import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { pageSeo } from "@/lib/content/seo";
import type { DimensionPercentages, TierId } from "@/types/assessment";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";
import { ScoreOverview } from "@/components/results/score-overview";
import { DimensionBars } from "@/components/results/dimension-bars";
import { Diagnosis } from "@/components/results/diagnosis";
import { DimensionRecommendations } from "@/components/results/dimension-recommendations";
import { TierCta } from "@/components/results/tier-cta";
import { TrackResultsView } from "@/components/results/track-view";
import { resultsPage, sectionTaglines } from "@/lib/content/results";

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
    .select("id, total_percentage, dimension_percentages, tier")
    .eq("id", id)
    .single<ResultsRow>();

  if (error || !data) {
    redirect("/assessment");
  }

  return (
    <main>
      <TrackResultsView tier={data.tier} totalPercentage={data.total_percentage} />

      {/* Section 1 — Score */}
      <Section bg="muted">
        <Reveal>
          <Tagline>{sectionTaglines.score}</Tagline>
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

      {/* Section 2 — Diagnosis */}
      <Section bg="default">
        <Reveal>
          <Tagline>{sectionTaglines.diagnosis}</Tagline>
          <Diagnosis tier={data.tier} dimensionPercentages={data.dimension_percentages} />
        </Reveal>
      </Section>

      {/* Section 3 — Recommendations */}
      <Section bg="muted">
        <Reveal>
          <Tagline>{sectionTaglines.recommendations}</Tagline>
          <DimensionRecommendations dimensionPercentages={data.dimension_percentages} />
        </Reveal>
      </Section>

      {/* Section 4 — CTA */}
      <Section bg="default">
        <Reveal>
          <TierCta tier={data.tier} assessmentId={data.id} />
        </Reveal>
      </Section>
    </main>
  );
}
