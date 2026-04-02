import type {
  DimensionId,
  DimensionMeta,
  Question,
  QualifyingQuestion,
} from "@/types/assessment";

// ─── Dimensions ─────────────────────────────────────────────────────────────

export const DIMENSIONS: readonly DimensionMeta[] = [
  {
    id: "migration_health",
    label: "Migration & Version Health",
    description:
      "How current is your Angular version and how smoothly can you upgrade?",
    dormantTension: "We're running on borrowed time",
    colorToken: "secondary",
  },
  {
    id: "architecture",
    label: "Codebase Architecture",
    description:
      "Is your codebase structured for scale, maintainability, and team productivity?",
    dormantTension: "Our codebase is fighting against us",
    colorToken: "secondary",
  },
  {
    id: "modern_adoption",
    label: "Modern Angular Adoption",
    description:
      "Are you leveraging standalone components, Signals, and modern patterns?",
    dormantTension: "We're writing yesterday's Angular",
    colorToken: "secondary",
  },
  {
    id: "ai_governance",
    label: "AI & Development Governance",
    description:
      "Does your team have guardrails for AI-assisted development?",
    dormantTension: "AI is writing code with no guardrails",
    colorToken: "secondary",
  },
  {
    id: "delivery_readiness",
    label: "Delivery & Talent Readiness",
    description:
      "Can you hire, ship, and invest in modernization without friction?",
    dormantTension: "This is already costing us",
    colorToken: "secondary",
  },
] as const;

export const DIMENSION_MAP: Record<DimensionId, DimensionMeta> =
  Object.fromEntries(DIMENSIONS.map((d) => [d.id, d])) as Record<
    DimensionId,
    DimensionMeta
  >;

// ─── Scored Questions (Q1–Q20) ──────────────────────────────────────────────

export const SCORED_QUESTIONS: readonly Question[] = [
  // D1: Migration & Version Health (max: 16)
  {
    id: "q1",
    dimensionId: "migration_health",
    text: "Is your app running Angular 16 or newer?",
    healthyAnswer: true,
    weight: 4,
  },
  {
    id: "q2",
    dimensionId: "migration_health",
    text: "Have you fully migrated away from AngularJS (v1.x)?",
    healthyAnswer: true,
    weight: 5,
  },
  {
    id: "q3",
    dimensionId: "migration_health",
    text: "Are your third-party dependencies updated at least annually?",
    healthyAnswer: true,
    weight: 3,
  },
  {
    id: "q4",
    dimensionId: "migration_health",
    text: "Can your team complete an Angular major version upgrade within 2 weeks?",
    healthyAnswer: true,
    weight: 4,
  },

  // D2: Codebase Architecture (max: 13)
  {
    id: "q5",
    dimensionId: "architecture",
    text: "Is your codebase organized in a monorepo or with clear feature boundaries?",
    healthyAnswer: true,
    weight: 4,
  },
  {
    id: "q6",
    dimensionId: "architecture",
    text: "Do you have documented architectural standards your team follows?",
    healthyAnswer: true,
    weight: 3,
  },
  {
    id: "q7",
    dimensionId: "architecture",
    text: "Have you had a codebase architecture review in the past year?",
    healthyAnswer: true,
    weight: 2,
  },
  {
    id: "q8",
    dimensionId: "architecture",
    text: "Can your modules or libraries be developed and tested independently?",
    healthyAnswer: true,
    weight: 4,
  },

  // D3: Modern Angular Adoption (max: 13)
  {
    id: "q9",
    dimensionId: "modern_adoption",
    text: "Have you adopted standalone components?",
    healthyAnswer: true,
    weight: 4,
  },
  {
    id: "q10",
    dimensionId: "modern_adoption",
    text: "Do you have a consistent strategy for reactive state (Signals, RxJS, or both)?",
    healthyAnswer: true,
    weight: 3,
  },
  {
    id: "q11",
    dimensionId: "modern_adoption",
    text: "Are your forms maintainable and free of repetitive boilerplate?",
    healthyAnswer: true,
    weight: 2,
  },
  {
    id: "q12",
    dimensionId: "modern_adoption",
    text: "Does your team trust the test suite enough to refactor with confidence?",
    healthyAnswer: true,
    weight: 4,
  },

  // D4: AI & Development Governance (max: 8)
  {
    id: "q13",
    dimensionId: "ai_governance",
    text: "Does your team have clear guidelines for using AI in Angular development?",
    healthyAnswer: true,
    weight: 2,
  },
  {
    id: "q14",
    dimensionId: "ai_governance",
    text: "Are AI-generated code changes held to the same review standards as human code?",
    healthyAnswer: true,
    weight: 3,
  },
  {
    id: "q15",
    dimensionId: "ai_governance",
    text: "Have you configured AI tools to follow your project's architectural patterns?",
    healthyAnswer: true,
    weight: 2,
  },
  {
    id: "q16",
    dimensionId: "ai_governance",
    text: "Is your team using AI to accelerate modernization (not just feature work)?",
    healthyAnswer: true,
    weight: 1,
  },

  // D5: Delivery & Talent Readiness (max: 16)
  {
    id: "q17",
    dimensionId: "delivery_readiness",
    text: "Can you fill an open Angular developer position within 8 weeks?",
    healthyAnswer: true,
    weight: 3,
  },
  {
    id: "q18",
    dimensionId: "delivery_readiness",
    text: "Can your team deploy with confidence and without fear of breaking changes?",
    healthyAnswer: true,
    weight: 5,
  },
  {
    id: "q19",
    dimensionId: "delivery_readiness",
    text: "Can your team ship new features without getting blocked by legacy Angular patterns?",
    healthyAnswer: true,
    weight: 4,
  },
  {
    id: "q20",
    dimensionId: "delivery_readiness",
    text: "Does leadership understand and budget for modernization needs?",
    healthyAnswer: true,
    weight: 4,
  },
] as const;

// ─── Qualifying Questions (Q21–Q22) ────────────────────────────────────────

export const QUALIFYING_QUESTIONS: readonly QualifyingQuestion[] = [
  {
    id: "q21",
    text: "What's your role on this project?",
    options: [
      { value: "cto_vp", label: "CTO / VP Engineering" },
      { value: "eng_manager", label: "Engineering Manager / Director" },
      { value: "tech_lead", label: "Tech Lead / Principal Engineer" },
      { value: "senior_dev", label: "Senior Developer / Architect" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "q22",
    text: "Are you actively planning a modernization initiative?",
    options: [
      { value: "yes_budget", label: "Yes, with budget and timeline" },
      { value: "yes_building_case", label: "Yes, building the business case" },
      { value: "exploring", label: "Exploring options, no formal plan" },
      { value: "not_yet", label: "Not yet, but aware it's needed" },
    ],
  },
] as const;

// ─── Weight Helpers ───────────────────────────────────────────────────────────

function sumWeights(questions: readonly Question[]): number {
  return questions.reduce((sum, q) => sum + q.weight, 0);
}

export function getMaxDimensionWeight(dimensionId: DimensionId): number {
  return sumWeights(
    SCORED_QUESTIONS.filter((q) => q.dimensionId === dimensionId),
  );
}

export function getMaxTotalWeight(): number {
  return sumWeights(SCORED_QUESTIONS);
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const TOTAL_SCORED_QUESTIONS = SCORED_QUESTIONS.length; // 20
export const QUESTIONS_PER_DIMENSION = 4;
export const MAX_TOTAL_WEIGHT = getMaxTotalWeight(); // 66
