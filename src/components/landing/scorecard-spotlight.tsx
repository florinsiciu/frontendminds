import Link from "next/link";
import { scorecardSpotlight } from "@/lib/content/landing";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const sampleScores = [
  { name: "Migration Health", pct: 56, color: "bg-blue-400" },
  { name: "Architecture", pct: 69, color: "bg-teal-400" },
  { name: "Modern Patterns", pct: 54, color: "bg-amber-400" },
  { name: "AI Readiness", pct: 38, color: "bg-purple-400" },
  { name: "Delivery", pct: 75, color: "bg-red-400" },
] as const;

function scoreColor(pct: number): string {
  if (pct <= 40) return "text-red-400";
  if (pct <= 74) return "text-amber-400";
  return "text-emerald-400";
}

export function ScorecardSpotlight() {
  const totalPct = Math.round(
    sampleScores.reduce((sum, d) => sum + d.pct, 0) / sampleScores.length,
  );

  return (
    <Section bg="warm">
      <div className="text-center">
        <Tagline>{scorecardSpotlight.eyebrow}</Tagline>
        <h2 className="mb-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
          Your Personalized{" "}<br className="hidden sm:inline" />Score Report
        </h2>
        <p className="mx-auto max-w-[580px] text-[1.125rem] leading-[1.7] text-[#94A3B8]">
          Here&apos;s what your results look like after 3 minutes of honest answers.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <GlassCard variant="highlight" className="p-5 sm:p-8 lg:p-10">
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Sample report
          </p>

          <div className="space-y-4">
            {sampleScores.map((dimension) => (
              <div key={dimension.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-slate-300">
                    {dimension.name}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      scoreColor(dimension.pct)
                    )}
                  >
                    {dimension.pct}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06]">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      dimension.color
                    )}
                    style={{
                      width: `${dimension.pct}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-400">Overall Score</p>
            <p className="font-heading text-5xl font-bold text-foreground">
              {totalPct}%
            </p>
            <span className="mt-3 inline-block rounded-full bg-amber-500/[0.15] px-4 py-1.5 text-sm font-semibold text-amber-400">
              Modernization Ready
            </span>
          </div>
        </GlassCard>
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Link
          href={scorecardSpotlight.ctaHref}
          className={cn(
            buttonVariants({ shape: "pill" }),
            "h-auto w-full py-4 text-[0.9375rem] font-semibold sm:w-auto sm:px-[2.25rem]"
          )}
        >
          Get Your Real Score
        </Link>
        <span className="text-xs text-muted-foreground">
          {scorecardSpotlight.trustSignal}
        </span>
      </div>
    </Section>
  );
}
