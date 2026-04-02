// ─── Page Copy ──────────────────────────────────────────────────────────────

export const servicesHero = {
  tagline: "Consulting Services",
  headline: "Stuck Between Legacy Code and a Full Rewrite?",
  subtitle:
    "You don't need to rebuild everything. Targeted modernization, smarter tooling, and a clear roadmap can get your Angular app where it needs to be — without the risk of a rewrite.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
} as const;

// ─── Problem → Solution Cards ───────────────────────────────────────────────

export const painPoints = [
  {
    quote: "We've been on Angular 12 for two years",
    explanation: "Each version you skip makes the next upgrade harder.",
    icon: "RefreshCw",
    borderColor: "#93C5FD",
    service: "Angular Modernization Audit",
    serviceHref: "#angular-audit",
  },
  {
    quote: "We bought 5 AI tools but none stuck",
    explanation: "Tool sprawl without workflow integration wastes budget.",
    icon: "Bot",
    borderColor: "#C4B5FD",
    service: "AI Tool Stack Rationalization",
    serviceHref: "#ai-rationalization",
  },
  {
    quote: "Nobody wants to touch the legacy module",
    explanation: "Fear of breakage slows every feature that touches old code.",
    icon: "Puzzle",
    borderColor: "#FBBF24",
    service: "Consulting & Implementation",
    serviceHref: "#consulting",
  },
  {
    quote: "We need a plan but don't know where to start",
    explanation: "Without a diagnostic, modernization efforts are guesswork.",
    icon: "Compass",
    borderColor: "#34D399",
    service: "Start with the Free Assessment",
    serviceHref: "/assessment",
  },
] as const;

// ─── Scorecard Bridge ───────────────────────────────────────────────────────

export const scorecardBridge = {
  tagline: "Not sure where you stand?",
  headline: "Start With a Free Diagnostic",
  subtitle:
    "Score your Angular app across 5 dimensions in under 3 minutes. Get a personalized action plan — then decide if you need help executing it.",
  stats: [
    { value: "20", label: "Questions" },
    { value: "5", label: "Dimensions" },
    { value: "3 min", label: "To complete" },
    { value: "Free", label: "No commitment", accent: "emerald" },
  ],
  dimensions: [
    { label: "Version Health", color: "#93C5FD" },
    { label: "Architecture", color: "#5EEAD4" },
    { label: "Dependencies", color: "#FBBF24" },
    { label: "AI Readiness", color: "#C4B5FD" },
    { label: "Delivery", color: "#F87171" },
  ],
  cta: { text: "Take the Free Assessment", href: "/assessment" },
  trustSignal: "No signup required until you see your results",
} as const;

// ─── Service Definitions ─────────────────────────────────────────────────────

export interface Service {
  id: string;
  icon: string;
  label: string;
  title: string;
  problem: string;
  description: string;
  outcomes: string[];
}

export const services: Service[] = [
  {
    id: "angular-audit",
    icon: "Search",
    label: "Service 01",
    title: "Angular Modernization Audit",
    problem:
      "You suspect your Angular codebase is slowing the team down — but you don't know where the biggest risks are or where to start.",
    description:
      "A deep-dive into your Angular project covering version health, architecture patterns, modern API adoption, and delivery readiness. You leave with a prioritized modernization roadmap your team can act on immediately.",
    outcomes: [
      "Full assessment across 5 modernization dimensions",
      "Prioritized list of technical debt and risks",
      "Actionable roadmap with quick wins and long-term milestones",
      "Written report delivered within 14 days",
      "60-minute debrief call with recommendations",
    ],
  },
  {
    id: "ai-rationalization",
    icon: "Bot",
    label: "Service 02",
    title: "AI Tool Stack Rationalization",
    problem:
      "Your team is adopting AI tools ad hoc — different devs using different tools with no governance, inconsistent output quality, and growing security concerns.",
    description:
      "An audit of your current AI tooling landscape followed by a structured recommendation for standardizing your stack. Covers IDE integrations, code review automation, documentation generation, and developer workflow tooling.",
    outcomes: [
      "Inventory of current AI tools and usage patterns",
      "Security and governance risk assessment",
      "Recommended standard stack with rationale",
      "Implementation guide and rollout plan",
      "Team onboarding playbook",
    ],
  },
  {
    id: "consulting",
    icon: "Puzzle",
    label: "Service 03",
    title: "Consulting & Implementation",
    problem:
      "You need a senior Angular expert on hand for a specific challenge — whether that's leading a migration, unblocking an architectural decision, or mentoring your team.",
    description:
      "Flexible consulting and hands-on implementation support tailored to your situation. Engagements range from one-off advisory sessions to multi-week embedded work alongside your team.",
    outcomes: [
      "Hands-on support for Angular migration or refactoring",
      "Architecture reviews and decision facilitation",
      "Team workshops and pair programming sessions",
      "Code review and pull request guidance",
      "Flexible scope — from single sessions to multi-week sprints",
    ],
  },
];

// ─── Fit Check (Cinderella Clients) ─────────────────────────────────────────

export const fitCheck = {
  tagline: "Is this a good fit?",
  headline: "Who These Services Are For",
  goodFit: [
    "You lead or work on an Angular team at a mid-size company",
    "Your app is 2+ major versions behind",
    "You've tried upgrading but it stalled or felt too risky",
    "You want a structured roadmap, not just opinions",
    "You're evaluating AI tools but need a clear strategy",
  ],
  notFit: [
    "You need a full ground-up rewrite (not modernization)",
    "You're looking for a staff-augmentation developer",
    "Your team is already on the latest Angular version",
    "You need React or Vue migration (this is Angular-focused)",
  ],
} as const;

// ─── Process Steps ──────────────────────────────────────────────────────────

export const processSteps = {
  tagline: "How it works",
  headline: "From First Call to Action Plan",
  steps: [
    {
      number: 1,
      title: "Take the Assessment",
      description:
        "Score your app across 5 dimensions in 3 minutes. Your results tell us exactly where to focus.",
      color: "#6366F1",
    },
    {
      number: 2,
      title: "Proposal & Scope",
      description:
        "I send a tailored proposal with scope, timeline, and investment. You decide if it fits.",
      color: "#34D399",
    },
    {
      number: 3,
      title: "Deliver & Walk Through",
      description:
        "I deliver the work, walk you through findings, and leave you with clear next steps.",
      color: "#FBBF24",
    },
  ],
} as const;

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const faqItems = [
  {
    question: "Why isn't pricing listed on the page?",
    answer:
      "Every project is different. Scope, complexity, and timeline vary. I send a transparent proposal after the discovery call so the investment reflects what you actually need — not a one-size-fits-all package.",
  },
  {
    question: "What if I'm not sure which service I need?",
    answer:
      "That's exactly what the free assessment and discovery call are for. The assessment scores your app across 5 dimensions, and the call helps us figure out the right engagement together.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "Audits take 10–14 days. Consulting engagements are flexible — from single advisory sessions to multi-week embedded work. We agree on timeline before starting.",
  },
  {
    question: "What do I need to prepare before we start?",
    answer:
      "For audits: repository access and a brief on your team's pain points. For consulting: a clear description of the challenge. I'll send a prep checklist after we agree on scope.",
  },
  {
    question: "Can you work alongside my existing team?",
    answer:
      "Yes. Consulting engagements are designed for collaboration — code reviews, pair programming, architecture sessions. I work with your team, not in isolation.",
  },
  {
    question: "What happens if we keep delaying the upgrade?",
    answer:
      "Each Angular version you skip compounds the upgrade cost. Dependencies drift, patterns become unsupported, and security patches stop. Teams that wait 3+ versions often face a rewrite conversation they could have avoided with incremental modernization.",
  },
] as const;

// ─── Final CTA ──────────────────────────────────────────────────────────────

export const servicesCta = {
  tagline: "Ready to start?",
  headline: "Every Version You Skip Makes the Next Upgrade Harder",
  subtitle:
    "Find out where your app stands in 3 minutes — then get a personalized next step.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
  trustSignal: "Free · No signup until results",
} as const;
