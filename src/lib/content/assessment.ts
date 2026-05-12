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

// ─── How Scoring Works ────────────────────────────────────────────────────

export const scoringExplainer = {
  heading: "How Scoring Works",
  paragraphs: [
    "Each question carries a business-impact weight from 1 to 5. Higher weights mean the gap has a larger effect on your team's ability to deliver, hire, and modernize.",
    "Your score is calculated per dimension and overall as a weighted percentage. A 75% overall score means you've earned 75% of the maximum possible business-impact points across all 20 questions.",
  ],
  tiers: [
    { range: "0–40%", label: "Critical Risk", description: "Significant gaps across multiple areas need structured attention." },
    { range: "41–74%", label: "Modernization Ready", description: "Solid foundations with clear improvement areas." },
    { range: "75–100%", label: "Well-Positioned", description: "Strong across the board — targeted optimizations will set you apart." },
  ],
  footnote:
    "The framework also identifies 18 diagnostic patterns — specific combinations of answers that reveal systemic problems spanning multiple dimensions.",
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
