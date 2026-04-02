// ─── Assessment Intro Page ──────────────────────────────────────────────────

export const intro = {
  heading: "Angular Modernization Assessment",
  methodology:
    "This assessment evaluates your Angular project across 5 critical dimensions based on real-world modernization patterns from enterprise teams.",
  benefitList: [
    "Pinpoint your biggest modernization gaps",
    "See how you compare across 5 key dimensions",
    "Get tier-specific recommendations",
    "Identify highest-impact next steps",
  ],
  microStats: ["20 Questions", "~3 Minutes", "Free"],
  dimensionLabel: "5 Scored Dimensions",
  credibility:
    "Built by FrontendMinds — practical Angular modernization expertise from real enterprise projects.",
  ctaText: "Start the Assessment",
  ctaHref: "/assessment/quiz",
} as const;

// ─── Email Gate ─────────────────────────────────────────────────────────────

export const emailGate = {
  tagline: "Assessment Complete",
  heading: "Your Score Is Ready",
  subheading:
    "Enter your details below to see your personalized modernization score and dimension breakdown.",
  trustSignals: [
    "Your results are calculated instantly",
    "We'll email you a copy of your score",
    "No spam — just your results and one follow-up",
  ],
  trustLine: "Your data stays private. No spam, ever.",
  form: {
    firstNameLabel: "First name",
    firstNamePlaceholder: "Your first name",
    emailLabel: "Email",
    emailPlaceholder: "you@company.com",
    submitText: "Unlock My Results",
  },
} as const;
