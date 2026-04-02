// ─── Dimension & Question ────────────────────────────────────────────────────

export type DimensionId =
  | "migration_health"
  | "architecture"
  | "modern_adoption"
  | "ai_governance"
  | "delivery_readiness";

export interface DimensionMeta {
  id: DimensionId;
  label: string;
  description: string;
  dormantTension: string;
  colorToken: string;
}

export interface Question {
  id: string; // "q1" … "q20"
  dimensionId: DimensionId;
  text: string;
  /** For all scored questions: Yes = healthy, No = gap */
  healthyAnswer: true;
  /** Business-impact weight (1–5). Higher = more important. */
  weight: number;
}

export interface QualifyingOption {
  value: string;
  label: string;
}

export interface QualifyingQuestion {
  id: string; // "q21", "q22"
  text: string;
  options: QualifyingOption[];
}

// ─── Scoring & Tiers ─────────────────────────────────────────────────────────

export type TierId = "critical_risk" | "modernization_ready" | "well_positioned";

export type DimensionTier = "low" | "medium" | "high";

export interface TierDefinition {
  id: TierId;
  label: string;
  scoreRange: { min: number; max: number };
  shortDiagnosis: string;
  ctaLabel: string;
  ctaHint: string;
}

export type DimensionPercentages = Record<DimensionId, number>;

export interface ScoringResult {
  /** Overall percentage (0–100) */
  totalPercentage: number;
  /** Per-dimension percentages (0–100) */
  dimensionPercentages: DimensionPercentages;
  tier: TierId;
}

// ─── Answers ─────────────────────────────────────────────────────────────────

/** Scored answers: q1–q20, each true (Yes) or false (No) */
export type ScoredAnswers = Record<string, boolean>;

/** Qualifying answers: q21 (role), q22 (planning stage) */
export interface QualifyingAnswers {
  role: string;
  planning: string;
}

// ─── Diagnostic Patterns ────────────────────────────────────────────────────

export type PatternPriority = "critical" | "warning" | "insight";

export interface PatternTrigger {
  questionId: string;
  expectedAnswer: boolean;
}

export interface DiagnosticPattern {
  id: string;
  name: string;
  triggers: PatternTrigger[];
  priority: PatternPriority;
  isCrossDimension: boolean;
  shortSummary: string;
  championSummary: string;
  ctoSummary: string;
  salesTalkTrack: string;
  recommendedAction: string;
}

export interface TriggeredPattern {
  pattern: DiagnosticPattern;
  score: number;
}

export type LeadBucket = "hot" | "warm" | "nurture";

export interface LeadScore {
  score: number;
  bucket: LeadBucket;
}

export interface SeesawScript {
  strongestDimension: { id: DimensionId; label: string; percentage: number };
  weakestDimension: { id: DimensionId; label: string; percentage: number };
  openingLine: string;
  pivotLine: string;
}

export interface DiagnosticResult {
  allTriggered: TriggeredPattern[];
  topPatterns: TriggeredPattern[];
  leadScore: LeadScore;
  seesawScript: SeesawScript;
  isStrongPosition: boolean;
}

// ─── Lead ────────────────────────────────────────────────────────────────────

export interface Lead {
  id: string;
  firstName: string;
  email: string;
  createdAt: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}

// ─── Assessment ──────────────────────────────────────────────────────────────

export interface Assessment {
  id: string;
  leadId: string;
  answers: ScoredAnswers;
  qualifyingAnswers: QualifyingAnswers;
  totalPercentage: number;
  dimensionPercentages: DimensionPercentages;
  tier: TierId;
  completedAt: string;
  emailSentAt?: string | null;
  triggeredPatterns?: TriggeredPattern[] | null;
  topPatterns?: TriggeredPattern[] | null;
  leadScore?: number | null;
  leadBucket?: LeadBucket | null;
  seesawData?: SeesawScript | null;
}

// ─── Content & Config Interfaces ─────────────────────────────────────────────

export interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface ProofStat {
  value: string;
  label: string;
  description: string;
}

export interface HowItWorksStep {
  title: string;
  description: string;
  icon: string;
}

export interface BenefitCard {
  title: string;
  description: string;
  dimensionId: DimensionId;
  tensionLine?: string;
}

export interface AudiencePersona {
  role: string;
  painPoint: string;
  description: string;
}

// ── Blog types ──────────────────────────────────────────────────────────────

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  image?: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

// ── Contact types ───────────────────────────────────────────────────────────

export interface ContactSubmission {
  name: string;
  email: string;
  reason: "general" | "service" | "speaking" | "partnership";
  message: string;
}
