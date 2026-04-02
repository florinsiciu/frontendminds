import {
  DIMENSION_ORDER,
  DIMENSION_COLORS,
  getDimensionTier,
  getDimensionScoreColor,
} from "@/lib/config/scoring";
import { dimensionDisplay } from "@/lib/content/results";
import { dimensionRecommendations } from "@/lib/content/dimension-recommendations";
import { GlassCard } from "@/components/ui/glass-card";
import type { DimensionPercentages } from "@/types/assessment";

const scoreColorClasses = {
  destructive: "bg-destructive/20 text-destructive",
  warning: "bg-warning/20 text-warning",
  secondary: "bg-secondary-foreground/20 text-secondary-foreground",
} as const;

interface DimensionRecommendationsProps {
  dimensionPercentages: DimensionPercentages;
}

export function DimensionRecommendations({
  dimensionPercentages,
}: DimensionRecommendationsProps) {
  return (
    <div className="space-y-4">
      {DIMENSION_ORDER.map((dimId) => {
        const pct = dimensionPercentages[dimId];
        const tier = getDimensionTier(pct);
        const color = getDimensionScoreColor(pct);
        const display = dimensionDisplay[dimId];
        const rec = dimensionRecommendations[dimId][tier];

        return (
          <GlassCard key={dimId} className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: DIMENSION_COLORS[dimId] }}
              />
              <h2 className="text-base font-semibold text-foreground">
                {display.label}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${scoreColorClasses[color]}`}
              >
                {pct}%
              </span>
            </div>

            <p className="mt-3 text-sm font-medium text-foreground">
              {rec.headline}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{rec.summary}</p>

            <ul className="mt-3 space-y-1.5">
              {rec.actionItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        );
      })}
    </div>
  );
}
