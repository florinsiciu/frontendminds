export const hero = {
  pillBadge: "Free Assessment · 20 Questions · 3 Minutes",
  headline: "How Modern Is Your Angular App?",
  subheadline:
    "Get a personalized score across five critical dimensions — from migration health to AI readiness. Takes 3 minutes.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
  secondaryCta: { text: "Read the Blog", href: "/blog" },
  socialProof: "Used by frontend leads at enterprise Angular teams",
  dimensionLabel: "5 Scored Dimensions",
} as const;

export const contentPillars = {
  eyebrow: "What we cover",
  headline: "Deep dives for frontend teams",
  description:
    "Practical, no-fluff content for engineering managers and senior devs navigating modernization.",
  items: [
    {
      title: "AI for Frontend",
      description:
        "Practical AI integration patterns for Angular and frontend teams. Beyond autocomplete — code reviews, architecture decisions, and workflow automation.",
      href: "/blog?category=ai-for-frontend",
      icon: "Zap",
      accent: "purple",
    },
    {
      title: "Angular Modernization",
      description:
        "Migration strategies, standalone components, and upgrade paths. Real-world lessons from teams who've made the leap.",
      href: "/blog?category=angular-ai",
      icon: "RefreshCw",
      accent: "indigo",
    },
    {
      title: "Dev Workflows",
      description:
        "CI/CD optimization, tooling choices, and developer experience improvements that actually move velocity metrics.",
      href: "/blog?category=dev-workflow",
      icon: "Timer",
      accent: "teal",
    },
    {
      title: "Practical Tooling",
      description:
        "Hands-on guides for the tools that actually move the needle — from build systems to testing frameworks.",
      href: "/blog?category=tutorials",
      icon: "Hexagon",
      accent: "amber",
    },
  ],
} as const;

export const scorecardSpotlight = {
  eyebrow: "See What You'll Get",
  heading: "Your Personalized Score Report",
  description:
    "20 yes-or-no questions. A personalized score across 5 critical dimensions — with specific recommendations for your app.",
  ctaText: "Get Your Real Score",
  ctaHref: "/assessment",
  trustSignal: "Free · No signup until results",
} as const;

export const newsletterCta = {
  tagline: "Newsletter",
  heading: "The Frontend Signal",
  subheading: "Actionable insights on Angular modernization, AI for dev teams, and frontend engineering — once a month. No fluff.",
  benefits: [
    "Migration patterns that actually work",
    "AI workflow wins from real teams",
    "Tool recommendations with honest reviews",
  ],
  ctaText: "Subscribe for Free",
  finePrint: "No spam. Unsubscribe anytime.",
  successMessage: "You're in! Check your inbox to confirm.",
} as const;

export const problemFraming = {
  eyebrow: "Sound familiar?",
  headline: "You're shipping features — but something feels off",
  situations: [
    {
      quote: "We keep patching the same AngularJS modules because nobody wants to touch the migration.",
      icon: "RefreshCw",
      dimensionColor: "blue",
    },
    {
      quote: "Our CI takes 20 minutes and half the team works around it with local builds.",
      icon: "Timer",
      dimensionColor: "amber",
    },
    {
      quote: "We bought Copilot licenses but nobody changed how they actually work.",
      icon: "Cog",
      dimensionColor: "purple",
    },
    {
      quote: "Leadership wants a modernization plan but we don't know where to start.",
      icon: "Hexagon",
      dimensionColor: "red",
    },
  ],
  closingLine: "These are the patterns we see in teams that are one bad quarter away from a costly rewrite.",
  transitionCta: { text: "Find out where you stand", href: "/assessment" },
} as const;

export const howItWorks = {
  eyebrow: "How it works",
  headline: "Three minutes to clarity",
  steps: [
    {
      number: 1,
      title: "Answer 20 questions",
      description:
        "Quick yes-or-no questions covering version health, architecture patterns, component strategies, AI governance, and delivery pipeline. No setup needed — just your knowledge of the codebase.",
    },
    {
      number: 2,
      title: "See your score",
      description:
        "Get an instant breakdown across all 5 dimensions with color-coded ratings. See exactly where your app is strong and where the gaps are hiding — no guesswork, no vague advice.",
    },
    {
      number: 3,
      title: "Get your action plan",
      description:
        "Receive personalized recommendations based on your tier — from quick wins you can ship this sprint to strategic moves for the quarter. Every suggestion maps to a specific dimension.",
    },
  ],
  ctaText: "See What Your Score Looks Like",
  ctaHref: "/assessment",
} as const;

export const statsBar = {
  stats: [
    { value: "20", label: "Diagnostic Questions" },
    { value: "5", label: "Scored Dimensions" },
    { value: "3 min", label: "To Complete" },
    { value: "Free", label: "No Strings Attached", accent: "emerald" },
  ],
} as const;

export const leadMagnet = {
  eyebrow: "Free Resource",
  headline: "5-Minute Angular Health Check",
  description:
    "5 questions to ask about your Angular app this week — with explanations and what each answer means.",
  ctaText: "Get the Guide",
  finePrint: "Free. No spam. Also get The Frontend Signal.",
  successMessage: "Check your inbox! The guide is on its way.",
} as const;

export const exitPopup = {
  eyebrow: "Before you go",
  headline: "Stay in the loop",
  description:
    "Get monthly AI + frontend insights — practical tips, Angular modernization strategies, and curated tools.",
  ctaText: "Subscribe to The Frontend Signal",
  alternativeText: "Or take the free scorecard instead",
  alternativeHref: "/assessment",
} as const;

export const founderSection = {
  eyebrow: "About the Founder",
  name: "Florin Siciu",
  title: "Angular Modernization Consultant",
  description:
    "8+ years helping frontend teams untangle legacy Angular codebases, adopt AI tools that actually work, and ship with confidence. Previously lead architect on a 19-app enterprise micro-frontend platform.",
  ctaText: "Learn more about Florin",
  ctaHref: "/about",
} as const;
