"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { SeesawScriptDisplay } from "@/components/admin/seesaw-script";
import type {
  DimensionPercentages,
  LeadBucket,
  QualifyingAnswers,
  ScoredAnswers,
  SeesawScript,
  TierId,
  TriggeredPattern,
} from "@/types/assessment";
import { DIMENSION_ORDER } from "@/lib/config/scoring";
import { DIMENSION_MAP } from "@/lib/data/questions";

interface LeadData {
  id: string;
  firstName: string;
  email: string;
  completedAt: string;
  totalPercentage: number;
  tier: TierId;
  dimensionPercentages: DimensionPercentages;
  qualifyingAnswers: QualifyingAnswers;
  answers: ScoredAnswers;
  triggeredPatterns: TriggeredPattern[];
  topPatterns: TriggeredPattern[];
  leadScore: number;
  leadBucket: LeadBucket;
  seesawData: SeesawScript;
}

interface LeadCardProps {
  lead: LeadData;
}

const BUCKET_BADGE: Record<LeadBucket, { label: string; className: string }> = {
  hot: { label: "HOT", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  warm: { label: "WARM", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  nurture: { label: "NURTURE", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
};

const PRIORITY_COLOR: Record<string, string> = {
  critical: "text-red-400",
  warning: "text-amber-400",
  insight: "text-blue-400",
};

const PRIORITY_ICON: Record<string, string> = {
  critical: "\u{1F534}",
  warning: "\u{1F7E1}",
  insight: "\u{1F4A1}",
};

const ROLE_LABELS: Record<string, string> = {
  cto_vp: "CTO / VP Engineering",
  eng_manager: "Engineering Manager / Director",
  tech_lead: "Tech Lead / Principal Engineer",
  senior_dev: "Senior Developer / Architect",
  other: "Other",
};

const STAGE_LABELS: Record<string, string> = {
  yes_budget: "Yes, with budget and timeline",
  yes_building_case: "Building the business case",
  exploring: "Exploring options",
  not_yet: "Not yet, but aware it's needed",
};

function getApproachRecommendation(
  role: string,
  stage: string,
  criticalCount: number,
): string {
  if (role === "tech_lead" && stage === "yes_building_case") {
    return "Help them build the internal case. Position yourself as the external expert who validates what they already know.";
  }
  if (role === "cto_vp" && stage === "yes_budget") {
    return "Direct engagement — they have authority and budget. Focus on roadmap and ROI.";
  }
  if (stage === "exploring") {
    return "Educational approach — share relevant insights, build trust before pitching.";
  }
  if (criticalCount >= 2) {
    return "Urgency angle — multiple critical patterns mean the cost of waiting is high.";
  }
  return "Consultative approach — understand their specific context before recommending solutions.";
}

export function LeadCard({ lead }: LeadCardProps) {
  const [expanded, setExpanded] = useState(false);
  const bucket = BUCKET_BADGE[lead.leadBucket];

  const criticalCount = lead.triggeredPatterns.filter(
    (tp) => tp.pattern.priority === "critical",
  ).length;

  return (
    <GlassCard className="p-5 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">
              {lead.firstName}
            </h3>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold ${bucket.className}`}
            >
              {bucket.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{lead.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            Score: {lead.leadScore}
          </p>
          <p className="text-xs text-muted-foreground">
            {lead.totalPercentage}% &middot; {lead.tier.replace(/_/g, " ")}
          </p>
          <p className="text-xs text-subtle">
            {new Date(lead.completedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Role & Stage */}
      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        <span>Role: {ROLE_LABELS[lead.qualifyingAnswers.role] ?? lead.qualifyingAnswers.role}</span>
        <span>Stage: {STAGE_LABELS[lead.qualifyingAnswers.planning] ?? lead.qualifyingAnswers.planning}</span>
      </div>

      {/* Seesaw Script */}
      <div className="mt-4">
        <SeesawScriptDisplay script={lead.seesawData} />
      </div>

      {/* Detected Patterns with Talk Tracks */}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-wider text-accent">
          Detected Patterns ({lead.triggeredPatterns.length} total)
        </p>
        <div className="mt-2 space-y-3">
          {lead.triggeredPatterns.map((tp) => (
            <div key={tp.pattern.id} className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
              <p className={`text-sm font-medium ${PRIORITY_COLOR[tp.pattern.priority]}`}>
                {PRIORITY_ICON[tp.pattern.priority]} {tp.pattern.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground italic">
                &ldquo;{tp.pattern.salesTalkTrack}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Qualifying Intel */}
      <div className="mt-4 rounded-lg bg-indigo-500/[0.04] border border-indigo-500/10 p-3">
        <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
          Approach Recommendation
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {getApproachRecommendation(
            lead.qualifyingAnswers.role,
            lead.qualifyingAnswers.planning,
            criticalCount,
          )}
        </p>
      </div>

      {/* Raw Answers (expandable) */}
      <div className="mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-accent hover:text-accent/80"
        >
          {expanded ? "Hide" : "Show"} raw answers
        </button>
        {expanded && (
          <div className="mt-2 grid grid-cols-5 gap-1 text-xs font-mono">
            {DIMENSION_ORDER.map((dimId) => (
              <div key={dimId}>
                <p className="font-medium text-foreground/60 truncate">
                  {DIMENSION_MAP[dimId].label.split(" ")[0]}
                </p>
                <p className="text-muted-foreground">
                  {lead.dimensionPercentages[dimId]}%
                </p>
              </div>
            ))}
            {Object.entries(lead.answers)
              .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
              .map(([qId, answer]) => (
                <span
                  key={qId}
                  className={answer ? "text-emerald-400" : "text-red-400"}
                >
                  {qId}: {answer ? "Y" : "N"}
                </span>
              ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
