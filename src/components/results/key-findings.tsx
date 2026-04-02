import { GlassCard } from "@/components/ui/glass-card";
import type { TriggeredPattern } from "@/types/assessment";

interface KeyFindingsProps {
  topPatterns: TriggeredPattern[];
  isStrongPosition: boolean;
  assessmentId: string;
}

const PRIORITY_BADGE: Record<
  string,
  { label: string; className: string }
> = {
  critical: {
    label: "Critical",
    className: "bg-red-500/10 text-red-400 border-red-500/20",
  },
  warning: {
    label: "Warning",
    className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  insight: {
    label: "Insight",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
};

function PatternCard({
  triggered,
  index,
}: {
  triggered: TriggeredPattern;
  index: number;
}) {
  const { pattern } = triggered;
  const badge = PRIORITY_BADGE[pattern.priority];

  return (
    <GlassCard className="p-4 lg:p-5">
      {/* Header: number + badge + name */}
      <div className="flex items-center gap-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-bold text-foreground/60">
          {index + 1}
        </span>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${badge.className}`}
        >
          {badge.label}
        </span>
        <h3 className="text-sm font-semibold text-foreground">
          {pattern.name}
        </h3>
      </div>

      {/* Short summary */}
      <p className="mt-2 text-sm text-muted-foreground">
        {pattern.shortSummary}
      </p>

      {/* Recommended action — prominent */}
      <div className="mt-3 border-l-2 border-indigo-500/40 pl-3">
        <p className="text-sm text-foreground/90">
          <span className="font-medium text-indigo-400">Next step: </span>
          {pattern.recommendedAction}
        </p>
      </div>
    </GlassCard>
  );
}

export function KeyFindings({
  topPatterns,
  isStrongPosition,
  assessmentId,
}: KeyFindingsProps) {
  if (isStrongPosition) {
    return (
      <GlassCard variant="highlight" className="p-6 lg:p-8">
        <h2 className="text-xl font-bold text-foreground">
          Your Angular Stack Is in Strong Shape
        </h2>
        <p className="mt-2 text-muted-foreground">
          Solid foundations across all key areas. A few refinement opportunities
          below.
        </p>
        {topPatterns.length > 0 && (
          <div className="mt-5 space-y-3">
            {topPatterns.map((tp, i) => (
              <PatternCard key={tp.pattern.id} triggered={tp} index={i} />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }

  return (
    <div>
      <div className="space-y-3">
        {topPatterns.map((tp, i) => (
          <PatternCard key={tp.pattern.id} triggered={tp} index={i} />
        ))}
      </div>

      <ShareButton assessmentId={assessmentId} />
    </div>
  );
}

function ShareButton({ assessmentId }: { assessmentId: string }) {
  return (
    <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
      <p className="text-sm text-muted-foreground">
        Share these findings with your leadership team
      </p>
      <a
        href={`/assessment/summary?id=${assessmentId}`}
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20"
      >
        Generate Executive Summary
      </a>
    </div>
  );
}
