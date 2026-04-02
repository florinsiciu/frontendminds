"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { DIMENSION_COLORS, DIMENSION_ORDER } from "@/lib/config/scoring";
import { DIMENSIONS } from "@/lib/data/questions";

const DIMENSION_LABEL_MAP = Object.fromEntries(
  DIMENSIONS.map((d) => [d.id, d.label])
) as Record<(typeof DIMENSION_ORDER)[number], string>;

function randomWidths(): number[] {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 51) + 40);
}

export function ScoreTeaser() {
  const [widths] = useState(randomWidths);

  return (
    <GlassCard className="relative overflow-hidden">
      {/* Blurred preview content */}
      <div className="filter blur-[6px] pointer-events-none opacity-50 p-6 space-y-5">
        <div className="text-center">
          <span className="text-4xl font-heading font-bold text-foreground">
            ??/20
          </span>
        </div>

        <div className="flex justify-center">
          <span className="inline-block rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-medium text-amber-400">
            Tier Placeholder
          </span>
        </div>

        <div className="space-y-3">
          {DIMENSION_ORDER.map((dimId, i) => (
            <div key={dimId} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{DIMENSION_LABEL_MAP[dimId]}</span>
                <span>?/4</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${widths[i]}%`,
                    backgroundColor: DIMENSION_COLORS[dimId],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-background/70 border border-white/[0.08] rounded-full px-4 py-2 text-sm font-medium text-foreground">
          🔒 Enter your email to unlock
        </span>
      </div>
    </GlassCard>
  );
}
