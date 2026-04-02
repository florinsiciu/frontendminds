import { siteConfig } from "@/lib/config/site";

export const NURTURE_SCHEDULE_DAYS = [0, 3, 7, 10, 14] as const;

export const nurtureEmails = [
  {
    subject: "Welcome to The Frontend Signal",
    preheader: "Here's what to expect — and a must-read article to start.",
    heading: "Welcome aboard",
    body: [
      "Thanks for subscribing to The Frontend Signal. You'll get practical insights on Angular modernization, AI integration, and developer workflows — no hype, only what works.",
      "To get you started, here's an article I think you'll find valuable:",
    ],
    cta: {
      text: "Read: 5 Signs Your Angular App Is Falling Behind",
      href: `${siteConfig.baseUrl}/blog/angular-falling-behind`,
    },
    closing: "More coming soon.\n— Florin",
  },
  {
    subject: "Quick tip: the upgrade blockers nobody talks about",
    preheader: "The real reason Angular upgrades stall isn't technical.",
    heading: "The hidden upgrade blocker",
    body: [
      "Most Angular upgrade projects don't fail because of breaking API changes. They fail because nobody mapped the full dependency graph first.",
      "Before you start any migration, ask these three questions:",
      "1. Which third-party libraries don't support the target version?\n2. How many circular dependencies exist in your module tree?\n3. Which parts of the codebase have zero test coverage?",
      "If you can't answer all three, you're not ready to migrate — you're ready to diagnose.",
    ],
    cta: null,
    closing: "— Florin",
  },
  {
    subject: "Do you know where your gaps are?",
    preheader: "Most teams don't — until a migration goes sideways.",
    heading: "The blind spots problem",
    body: [
      "I've worked with teams that were confident their Angular app was in good shape — until we ran a structured assessment.",
      "The pattern is always the same: strong in one or two areas, blind spots in others. Architecture looks solid, but migration readiness is a 2/4. Or the delivery pipeline is modern, but the codebase can't adopt Signals.",
      "That's why I built the Angular Modernization Scorecard — a free 3-minute assessment that benchmarks your app across 5 dimensions. You get a personalized score and a clear picture of where to focus first.",
    ],
    cta: {
      text: "Take the Free Scorecard (3 minutes)",
      href: `${siteConfig.baseUrl}/assessment`,
    },
    closing: "— Florin",
  },
  {
    subject: "What happened when a team actually migrated right",
    preheader: "19 apps. Zero downtime. Here's the approach.",
    heading: "Migration done right",
    body: [
      "Over the past 4 years, I've led the modernization of 19 Angular applications — from AngularJS and Angular 8-14 to the latest version. Zero production incidents. Zero rollbacks.",
      "The difference wasn't talent or budget. It was approach:",
      "• Diagnose first — every app got a structured assessment before any code was written\n• Incremental delivery — never more than 2 weeks between shippable milestones\n• Dimension scoring — track progress across migration readiness, architecture, modern patterns, AI readiness, and delivery health",
      "The assessment framework I used is now available as a free tool. Same dimensions, same scoring — adapted for self-service.",
    ],
    cta: {
      text: "See Where Your App Stands",
      href: `${siteConfig.baseUrl}/assessment`,
    },
    closing: "— Florin",
  },
  {
    subject: "Your Angular app in 3 minutes",
    preheader: "20 questions. 5 dimensions. Personalized score.",
    heading: "One last thing",
    body: [
      "I've been sharing insights on Angular modernization over the past two weeks. If any of it resonated, there's one concrete step you can take right now.",
      "The Angular Modernization Scorecard takes 3 minutes. You answer 20 questions about your project, and you get:",
      "• A total score out of 20\n• Breakdown across 5 dimensions (migration, architecture, modern patterns, AI readiness, delivery)\n• Tier-based diagnosis with prioritized next steps",
      "It's free, no strings attached. Built from the same framework I use in paid consulting engagements.",
    ],
    cta: {
      text: "Take the Free Scorecard →",
      href: `${siteConfig.baseUrl}/assessment`,
    },
    closing:
      "Thanks for reading The Frontend Signal. Hit reply if you ever want to chat about Angular modernization — I read every email.\n\n— Florin",
  },
] as const;
