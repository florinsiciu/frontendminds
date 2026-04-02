import { TIER_MAP } from "@/lib/config/scoring";
import { resultsPage } from "@/lib/content/results";
import { GlassCard } from "@/components/ui/glass-card";
import type { TierId } from "@/types/assessment";

const tierBadgeColors: Record<TierId, string> = {
  critical_risk: "bg-destructive/20 text-destructive",
  modernization_ready: "bg-warning/20 text-warning",
  well_positioned: "bg-secondary-foreground/20 text-secondary-foreground",
};

interface ScoreOverviewProps {
  totalPercentage: number;
  tier: TierId;
}

export function ScoreOverview({ totalPercentage, tier }: ScoreOverviewProps) {
  const tierDef = TIER_MAP[tier];

  return (
    <GlassCard className="p-6 lg:p-8 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-subtle">
        {resultsPage.overallScoreLabel}
      </p>

      <div className="mt-3 flex items-baseline justify-center gap-2">
        <span className="font-heading text-5xl font-bold tabular-nums text-foreground lg:text-6xl">
          {totalPercentage}
        </span>
        <span className="text-xl text-muted-foreground">%</span>
      </div>

      {/* Score bar */}
      <div className="mt-4">
        <div className="h-3 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all"
            style={{ width: `${totalPercentage}%` }}
          />
        </div>

        {/* Tier ranges */}
        <div className="mt-2 flex justify-between text-xs text-subtle">
          <span>0%</span>
          <span>40%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Tier badge + diagnosis */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <span
          className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-semibold ${tierBadgeColors[tier]}`}
        >
          {tierDef.label}
        </span>
        <p className="text-muted-foreground">{tierDef.shortDiagnosis}</p>
      </div>
    </GlassCard>
  );
}
