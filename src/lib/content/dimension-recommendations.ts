import type { DimensionId, DimensionTier } from "@/types/assessment";

export interface DimensionRecommendation {
  headline: string;
  summary: string;
  actionItems: string[];
}

export const dimensionRecommendations: Record<
  DimensionId,
  Record<DimensionTier, DimensionRecommendation>
> = {
  // ─── Migration & Version Health ────────────────────────────────────────────
  migration_health: {
    low: {
      headline: "Your migration health needs urgent attention",
      summary:
        "Running on an outdated Angular version or carrying AngularJS legacy code creates compounding risk. Security patches stop, the ecosystem moves on, and every month of delay makes the eventual upgrade harder and more expensive.",
      actionItems: [
        "Audit your current Angular version and map the upgrade path to the latest LTS",
        "Identify AngularJS remnants and create a phased migration plan",
        "Update third-party dependencies to reduce known vulnerability exposure",
      ],
    },
    medium: {
      headline: "Solid version health with room to tighten",
      summary:
        "You're not critically behind, but there are gaps that slow your upgrade cadence. Closing them now prevents drift from becoming a full migration project later.",
      actionItems: [
        "Establish a quarterly dependency update cadence",
        "Reduce your Angular major version upgrade time to under 2 weeks",
        "Automate upgrade testing with a dedicated CI pipeline",
      ],
    },
    high: {
      headline: "Version health is a strength",
      summary:
        "Your team stays current and upgrades smoothly. This is a competitive advantage — modern Angular features and security patches reach your users quickly.",
      actionItems: [
        "Maintain your upgrade cadence and document the process for new team members",
        "Consider contributing upgrade guides back to the Angular community",
      ],
    },
  },

  // ─── Codebase Architecture ─────────────────────────────────────────────────
  architecture: {
    low: {
      headline: "Your architecture is holding your team back",
      summary:
        "Without clear boundaries and modular structure, every change touches too many files. Teams step on each other, onboarding takes longer, and refactoring feels risky because nothing is isolated.",
      actionItems: [
        "Define feature boundaries and enforce them with linting rules or NX project constraints",
        "Document your architectural standards so the team has a shared reference",
        "Schedule an architecture review to identify the highest-leverage structural improvements",
      ],
    },
    medium: {
      headline: "Good foundations — sharpen the boundaries",
      summary:
        "Your codebase has structure, but some modules are tightly coupled or lack independent testability. Tightening these boundaries will unlock faster parallel development.",
      actionItems: [
        "Identify the 2-3 most coupled modules and extract clean interfaces",
        "Ensure each library or feature module can be tested in isolation",
        "Review and update your architectural documentation to reflect current state",
      ],
    },
    high: {
      headline: "Clean architecture driving team velocity",
      summary:
        "Your codebase is well-structured with clear boundaries. Teams can work independently, onboard quickly, and refactor with confidence.",
      actionItems: [
        "Keep your architectural standards current as the codebase evolves",
        "Use architecture fitness functions or dependency graphs to catch drift early",
      ],
    },
  },

  // ─── Modern Angular Adoption ───────────────────────────────────────────────
  modern_adoption: {
    low: {
      headline: "Legacy patterns are slowing you down",
      summary:
        "Without standalone components, a clear reactivity strategy, or reliable tests, your team is writing Angular the way it was done 5 years ago. Modern patterns exist to solve real productivity problems — skipping them means you're solving those problems the hard way.",
      actionItems: [
        "Start migrating to standalone components — Angular provides automated schematics for this",
        "Choose a reactive state strategy (Signals, RxJS, or a deliberate hybrid) and document it",
        "Invest in test coverage so your team can refactor with confidence",
      ],
    },
    medium: {
      headline: "Partial adoption — time to go all-in",
      summary:
        "You've started adopting modern patterns, but inconsistency across the codebase creates cognitive overhead. Developers have to know both the old and new way, which slows everyone down.",
      actionItems: [
        "Complete the standalone migration for remaining NgModule-based components",
        "Standardize your forms approach to reduce boilerplate and improve maintainability",
        "Increase test reliability so refactoring isn't blocked by flaky tests",
      ],
    },
    high: {
      headline: "Modern Angular is your competitive edge",
      summary:
        "You've adopted standalone components, have a clear reactivity strategy, and your test suite supports confident refactoring. This positions you well for future Angular evolution.",
      actionItems: [
        "Stay ahead by evaluating new Angular features (e.g., signal-based components) early",
        "Share your adoption patterns as internal documentation or external content",
      ],
    },
  },

  // ─── AI & Development Governance ───────────────────────────────────────────
  ai_governance: {
    low: {
      headline: "AI is writing code without guardrails",
      summary:
        "Your team is likely using AI tools already — but without guidelines, review standards, or project-aware configuration, AI-generated code introduces inconsistency and technical debt at machine speed.",
      actionItems: [
        "Establish clear guidelines for AI-assisted development in your team",
        "Ensure AI-generated code goes through the same review process as human code",
        "Configure AI tools with your project's architectural patterns and conventions",
      ],
    },
    medium: {
      headline: "Good awareness — deepen the integration",
      summary:
        "You have some AI governance in place, but there's room to make AI a true accelerator for modernization rather than just a code completion tool.",
      actionItems: [
        "Configure AI tools with project-specific context (CLAUDE.md, .cursorrules, etc.)",
        "Use AI to accelerate modernization tasks like migration and refactoring, not just feature work",
      ],
    },
    high: {
      headline: "AI governance is well-managed",
      summary:
        "Your team has clear AI guidelines, enforces review standards, and uses AI strategically for modernization. This is a force multiplier that most teams haven't figured out yet.",
      actionItems: [
        "Continue refining your AI configuration as tools and models evolve",
        "Measure the impact of AI-assisted development on delivery speed and code quality",
      ],
    },
  },

  // ─── Delivery & Talent Readiness ───────────────────────────────────────────
  delivery_readiness: {
    low: {
      headline: "Delivery friction is costing you",
      summary:
        "When hiring is slow, deployments are risky, legacy patterns block new features, and leadership doesn't budget for modernization — everything compounds. Delivery readiness isn't just a technical problem, it's an organizational one.",
      actionItems: [
        "Make the business case for modernization investment with concrete ROI metrics",
        "Reduce deployment risk with better CI/CD, staging environments, and rollback strategies",
        "Address hiring friction by modernizing your stack to attract Angular talent",
      ],
    },
    medium: {
      headline: "Capable team — remove the remaining blockers",
      summary:
        "Your team can deliver, but friction points remain. Whether it's legacy code blocking features, slow hiring, or inconsistent deployment confidence — targeted improvements will unlock significantly faster delivery.",
      actionItems: [
        "Identify the top 2-3 legacy patterns that block feature delivery and prioritize their removal",
        "Ensure leadership understands and budgets for ongoing modernization",
        "Strengthen deployment confidence with automated smoke tests and canary releases",
      ],
    },
    high: {
      headline: "Strong delivery engine",
      summary:
        "Your team ships confidently, hires effectively, and has leadership buy-in for modernization. This organizational readiness is as valuable as any technical advantage.",
      actionItems: [
        "Maintain leadership alignment by reporting modernization ROI regularly",
        "Continue investing in developer experience to retain and attract top talent",
      ],
    },
  },
};
