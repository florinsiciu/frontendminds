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
    className:
      "bg-red-500/10 text-red-400 border-red-500/20",
  },
  warning: {
    label: "Warning",
    className:
      "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  insight: {
    label: "Insight",
    className:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
};

function PatternCard({ triggered }: { triggered: TriggeredPattern }) {
  const { pattern } = triggered;
  const badge = PRIORITY_BADGE[pattern.priority];

  return (
    <GlassCard className="p-5 lg:p-6">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
        >
          {badge.label}
        </span>
        <h3 className="text-base font-semibold text-foreground">
          {pattern.name}
        </h3>
      </div>

      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        {pattern.championSummary}
      </p>

      <div className="mt-3 rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
        <p className="text-xs font-medium text-accent uppercase tracking-wider">
          Recommended Action
        </p>
        <p className="mt-1 text-sm text-foreground/80">
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
          Your team has built solid foundations across all key areas. The
          assessment identified a few refinement opportunities below, but
          overall your Angular stack is well-maintained and positioned for
          growth.
        </p>
        {topPatterns.length > 0 && (
          <div className="mt-6 space-y-4">
            {topPatterns.map((tp) => (
              <PatternCard key={tp.pattern.id} triggered={tp} />
            ))}
          </div>
        )}
      </GlassCard>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground">
        Key Findings
      </h2>
      <p className="mt-2 text-muted-foreground">
        We identified {topPatterns.length} specific pattern
        {topPatterns.length !== 1 ? "s" : ""} in your answers that reveal
        where your Angular stack is holding you back.
      </p>

      <div className="mt-6 space-y-4">
        {topPatterns.map((tp) => (
          <PatternCard key={tp.pattern.id} triggered={tp} />
        ))}
      </div>

      <ShareButton assessmentId={assessmentId} />
    </div>
  );
}

function ShareButton({ assessmentId }: { assessmentId: string }) {
  return (
    <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
      <p className="text-sm text-muted-foreground">
        Want to share these findings with your leadership team?
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
