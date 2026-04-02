export const newsletterPage = {
  heading: "The Frontend Signal",
  subheading:
    "Practical AI + frontend insights, delivered monthly. Tools that work, patterns that scale, and lessons from real implementation work.",
  features: [
    "AI integration patterns for frontend teams",
    "Angular modernization strategies and case studies",
    "Developer workflow and tooling reviews",
    "No hype — only what actually works",
  ],
  frequency: "Once a month · Unsubscribe anytime",
  formCta: "Subscribe",
  successMessage: "You're in! Check your inbox for a welcome email.",
  author: {
    initials: "FS",
    name: "Florin Siciu",
    credential: "Angular consultant & AI integration specialist",
  },
  sampleIssue: {
    title: "How to Integrate LLMs Into Your Angular PR Review Workflow",
    excerpt:
      "Most teams bolt on AI code review as an afterthought — a GitHub Action that comments \"LGTM\" on every PR. Here's a pattern that actually catches real issues and saves your team hours per week.",
    readTime: "5 min read",
    formatTags: [
      { label: "🎯 The Problem", color: "primary" as const },
      { label: "✅ The Pattern", color: "emerald" as const },
      { label: "⚡ Code Example", color: "amber" as const },
      { label: "📊 Results", color: "purple" as const },
    ],
  },
  topics: [
    {
      title: "Migration Strategies",
      description:
        "Version upgrades, incremental migration, standalone component adoption",
      color: "migration" as const,
    },
    {
      title: "Architecture Patterns",
      description:
        "Signals, state management, micro-frontends, scalable structures",
      color: "architecture" as const,
    },
    {
      title: "AI Integration",
      description:
        "LLM workflows, AI-assisted code review, pair programming tools",
      color: "ai" as const,
    },
    {
      title: "Developer Workflow",
      description: "CI/CD optimization, tooling reviews, productivity patterns",
      color: "modern" as const,
    },
  ],
  closingCta: {
    heading: "Don't Miss the Next Issue",
    subheading:
      "Join frontend engineers who want to modernize with confidence — not guesswork.",
    finePrint: "No spam · Unsubscribe anytime",
  },
  crossSell: {
    text: "Not sure where your Angular app stands?",
    linkText: "Take the free Modernization Scorecard",
    href: "/assessment",
  },
} as const;

export const newsletterFormDefaults = {
  placeholder: {
    firstName: "First name",
    email: "you@company.com",
  },
  submitText: "Subscribe for Free",
  submittingText: "Subscribing…",
  successMessage: "You're in! Check your inbox for a welcome email.",
  crossSell: {
    text: "In the meantime, see where your Angular app stands →",
    href: "/assessment",
  },
} as const;
