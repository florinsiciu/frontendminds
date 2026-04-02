import {
  DIMENSION_ORDER,
  DIMENSION_COLORS,
  getDimensionLabel,
} from "@/lib/config/scoring";
import { dimensionDisplay } from "@/lib/content/results";
import { GlassCard } from "@/components/ui/glass-card";
import type { DimensionPercentages } from "@/types/assessment";

function percentageColor(pct: number): string {
  if (pct >= 75) return "text-emerald-400";
  if (pct >= 41) return "text-amber-400";
  return "text-red-400";
}

interface DimensionBarsProps {
  dimensionPercentages: DimensionPercentages;
}

export function DimensionBars({ dimensionPercentages }: DimensionBarsProps) {
  return (
    <GlassCard className="p-6 lg:p-8">
      <div className="space-y-5">
        {DIMENSION_ORDER.map((dimId) => {
          const pct = dimensionPercentages[dimId];
          const display = dimensionDisplay[dimId];
          const label = getDimensionLabel(pct);

          return (
            <div key={dimId}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-foreground">
                  {display.label}
                </span>
                <span className={`text-sm tabular-nums ${percentageColor(pct)}`}>
                  {pct}%{" "}
                  <span className="text-xs text-subtle">— {label}</span>
                </span>
              </div>

              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: DIMENSION_COLORS[dimId],
                  }}
                />
              </div>

              <p className="mt-1 text-xs text-subtle">{display.description}</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
