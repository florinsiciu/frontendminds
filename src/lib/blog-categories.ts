export const CATEGORIES = {
  "ai-for-frontend": "AI for Frontend",
  "angular-ai": "Angular + AI",
  "dev-workflow": "Dev Workflow & Tooling",
  tutorials: "Tutorials",
  "case-studies": "Case Studies",
  strategy: "Strategy & Opinions",
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
