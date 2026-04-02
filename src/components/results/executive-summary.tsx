import { GlassCard } from "@/components/ui/glass-card";
import { siteConfig } from "@/lib/config/site";
import type { TriggeredPattern, DimensionPercentages } from "@/types/assessment";

interface ExecutiveSummaryProps {
  totalPercentage: number;
  dimensionPercentages: DimensionPercentages;
  topPatterns: TriggeredPattern[];
  firstName: string;
}

function getLetterGrade(percentage: number): { grade: string; color: string } {
  if (percentage >= 90) return { grade: "A", color: "text-emerald-400" };
  if (percentage >= 75) return { grade: "B", color: "text-emerald-400" };
  if (percentage >= 60) return { grade: "C", color: "text-amber-400" };
  if (percentage >= 41) return { grade: "D", color: "text-amber-400" };
  return { grade: "F", color: "text-red-400" };
}

function getDeliveryImpact(topPatterns: TriggeredPattern[]): string {
  const criticalCount = topPatterns.filter(
    (tp) => tp.pattern.priority === "critical",
  ).length;

  if (criticalCount >= 2) {
    return "Multiple critical patterns indicate systemic risk to delivery timelines. Teams in this situation typically experience 30-50% longer feature cycles, elevated defect rates, and difficulty retaining experienced engineers. These patterns compound over time — the cost of inaction grows with each quarter.";
  }

  if (criticalCount >= 1) {
    return "A critical pattern was identified that directly impacts delivery capability. Teams with this profile often see delayed releases, increased rework, and growing frustration among senior engineers. Addressing this proactively prevents escalation into a broader organizational challenge.";
  }

  return "Several improvement areas were identified that, while not critical, represent drag on team velocity. Addressing these patterns can meaningfully improve delivery speed and developer satisfaction.";
}

export function ExecutiveSummary({
  totalPercentage,
  dimensionPercentages,
  topPatterns,
  firstName,
}: ExecutiveSummaryProps) {
  const { grade, color } = getLetterGrade(totalPercentage);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">
          Angular Modernization Assessment
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Executive Summary
        </h1>
        <p className="mt-1 text-muted-foreground">
          Prepared for {firstName}&rsquo;s team
        </p>
      </div>

      {/* Health Grade */}
      <GlassCard className="p-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Overall Technology Health Grade
        </p>
        <p className={`mt-2 font-heading text-6xl font-bold ${color}`}>
          {grade}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalPercentage}% across 5 assessment dimensions
        </p>
      </GlassCard>

      {/* Top Business Risks */}
      {topPatterns.length > 0 && (
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold text-foreground">
            Key Business Risks Identified
          </h2>
          <div className="mt-4 space-y-4">
            {topPatterns.map((tp, i) => (
              <div
                key={tp.pattern.id}
                className="border-l-2 border-white/10 pl-4"
              >
                <p className="text-sm font-medium text-foreground">
                  {i + 1}. {tp.pattern.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {tp.pattern.ctoSummary}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Delivery Impact */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Impact on Delivery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {getDeliveryImpact(topPatterns)}
        </p>
      </GlassCard>

      {/* Recommended Next Steps */}
      <GlassCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Recommended Next Steps
        </h2>
        <ol className="mt-3 space-y-2">
          {topPatterns.slice(0, 3).map((tp, i) => (
            <li
              key={tp.pattern.id}
              className="flex gap-3 text-sm text-muted-foreground"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-xs font-medium text-indigo-400">
                {i + 1}
              </span>
              <span>{tp.pattern.recommendedAction}</span>
            </li>
          ))}
        </ol>
      </GlassCard>

      {/* CTA */}
      <GlassCard variant="highlight" className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Want expert guidance on addressing these findings?
        </p>
        <a
          href={siteConfig.calendly.buildUrl("executive-summary")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          Book a Strategy Call
        </a>
      </GlassCard>

      {/* Footer */}
      <p className="text-center text-xs text-subtle">
        Assessment by {siteConfig.name} &middot; {siteConfig.baseUrl}
      </p>
    </div>
  );
}
