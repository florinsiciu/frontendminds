import type { SeesawScript } from "@/types/assessment";

interface SeesawScriptProps {
  script: SeesawScript;
}

export function SeesawScriptDisplay({ script }: SeesawScriptProps) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="text-xs font-medium uppercase tracking-wider text-accent">
        Seesaw Script
      </p>

      <div className="mt-3 space-y-3">
        <div>
          <p className="text-xs font-medium text-emerald-400">
            Open with strength ({script.strongestDimension.label}:{" "}
            {script.strongestDimension.percentage}%)
          </p>
          <p className="mt-1 text-sm text-muted-foreground italic">
            &ldquo;{script.openingLine}&rdquo;
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-red-400">
            Pivot to gap ({script.weakestDimension.label}:{" "}
            {script.weakestDimension.percentage}%)
          </p>
          <p className="mt-1 text-sm text-muted-foreground italic">
            &ldquo;{script.pivotLine}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
