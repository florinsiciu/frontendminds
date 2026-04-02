// ─── About Page Content ──────────────────────────────────────────────────────

// Legacy export — kept for backward compatibility
export const aboutPage = {
  heading: "About FrontendMinds",
  mission:
    "FrontendMinds is a knowledge hub for developers navigating the intersection of Angular modernization and practical AI. It exists to cut through the noise — no hype, no generic advice — just proven patterns, honest assessments, and focused tools for teams who want to ship better software.",

  whoItsFor: [
    "CTOs and VPs of Engineering evaluating the risk of legacy Angular codebases",
    "Engineering managers deciding how to allocate modernization effort",
    "Tech leads driving architectural decisions and tooling standards",
    "Senior frontend developers who want to sharpen their edge in an AI-accelerated world",
  ],

  founder: {
    name: "Florin Siciu",
    title: "Founder & Angular Modernization Consultant",
    bio: "I'm an Angular consultant based in Europe with 8+ years of hands-on Angular and AngularJS experience building and modernizing large-scale frontend applications. I've worked with teams ranging from scrappy startups to enterprise organizations across retail technology, logistics, and SaaS — and I've seen the same patterns cause the same problems, again and again. FrontendMinds started as a way to systematize what I've learned: how to assess a codebase honestly, how to build a modernization roadmap that teams actually follow, and how to integrate AI tooling without creating new chaos.",
    expertise: [
      "Angular (v2 – v19+)",
      "Signals & Zoneless",
      "RxJS",
      "NgRx",
      "TypeScript",
      "AI-assisted development",
      "Modernization strategy",
      "Frontend architecture",
    ],
  },
};

// ─── Section: Hero ───────────────────────────────────────────────────────────

export const aboutHero = {
  tagline: "About FrontendMinds",
  headline: "Built by an Engineer Who's Been in the Codebase",
  positioning:
    "I'm Florin Siciu — an Angular architect with 8+ years of hands-on experience. I spent the last 4 years leading the architecture for a 19-app enterprise micro-frontend platform — migrating all of them from Angular 9 to 17 with zero production downtime. FrontendMinds is how I systematize what I've learned into frameworks that help teams modernize without rewrites.",
} as const;

// ─── Section: Origin Story ───────────────────────────────────────────────────

export const aboutOrigin = {
  tagline: "The Story",
  headline: "Why FrontendMinds Exists",
  paragraphs: [
    "Over four years as lead frontend architect, I migrated 19 enterprise micro-frontend applications from Angular 9 through 17 — with zero production downtime. I built 13+ shared component libraries, designed CI/CD pipelines that cut build times by 3x, and rewrote 3 legacy AngularJS apps to modern Angular using AI-assisted development.",
    "Along the way, I kept seeing the same patterns break other teams. A legacy Angular app that nobody wants to touch. A migration plan that stalls after the first sprint. AI tools purchased but never integrated into how anyone actually works. Leadership asking for a modernization roadmap, and the team not knowing where to start.",
    "So I built a framework — five dimensions that capture what actually matters when you're modernizing an Angular app. Not a checklist from a blog post. A diagnostic system built from the patterns I've seen succeed and fail across enterprise platforms in retail technology, logistics, and SaaS.",
  ],
} as const;

// ─── Section: Framework ──────────────────────────────────────────────────────

export const aboutFramework = {
  tagline: "The Framework",
  headline: "5 Dimensions of Angular Modernization",
  subtitle:
    "Every Angular app has a different weak point. The scorecard measures what actually matters — so you fix the right things first.",
  dimensions: [
    {
      name: "Migration Health",
      description:
        "How far along is your Angular version? Are you stuck on AngularJS, or keeping up with the latest releases?",
      color: "#93C5FD",
      icon: "RefreshCw",
    },
    {
      name: "Architecture",
      description:
        "Is your codebase modular and maintainable, or is it a monolith of tightly coupled modules?",
      color: "#5EEAD4",
      icon: "Layers",
    },
    {
      name: "Modern Patterns",
      description:
        "Standalone components, signals, new control flow — are you adopting the patterns that reduce boilerplate and improve performance?",
      color: "#FBBF24",
      icon: "Sparkles",
    },
    {
      name: "AI Readiness",
      description:
        "Do you have an AI tool strategy, or are licenses collecting dust? Are workflows actually changing?",
      color: "#C4B5FD",
      icon: "Bot",
    },
    {
      name: "Delivery & Pipeline",
      description:
        "How healthy is your CI/CD? Can you ship confidently, or does every deploy feel like a gamble?",
      color: "#F87171",
      icon: "Rocket",
    },
  ],
  cta: { text: "See Where Your App Stands", href: "/assessment" },
} as const;

// ─── Section: Experience ─────────────────────────────────────────────────────

export const aboutExperience = {
  tagline: "Experience",
  headline: "Problems I've Solved",
  items: [
    {
      title: "Migrated 19 Apps from Angular 9 → 17",
      description:
        "Incremental migration across 5 major versions with zero production downtime. 95+ migration-specific commits across all micro-frontends.",
      icon: "RefreshCw",
    },
    {
      title: "Architected 19 Micro-Frontends from Scratch",
      description:
        "Designed an Nx monorepo with host/remote composition, shared authentication, multi-tenant routing, and library boundaries.",
      icon: "Puzzle",
    },
    {
      title: "Built 13+ Reusable Component Libraries",
      description:
        "From ui-datatable (39+ releases) to design tokens, form components, and auth libraries — all shared across 19 applications.",
      icon: "Zap",
    },
    {
      title: "Built CI/CD from Zero, Then Cut It to 20 Min",
      description:
        "Replaced manual dev-machine builds with automated CI/CD. Optimized the full monolith pipeline from 1h+ down to 20–30 minutes.",
      icon: "GitBranch",
    },
    {
      title: "Implemented Enterprise SSO/OIDC",
      description:
        "Built OAuth 2.0 authentication with PKCE, token management, and multi-tenant session handling spanning all 19 micro-frontends.",
      icon: "Shield",
    },
    {
      title: "Rewrote Legacy AngularJS with AI",
      description:
        "Used AI-assisted development to rewrite 3 legacy AngularJS applications directly to modern Angular 17 with signals and standalone components.",
      icon: "Bot",
    },
  ],
} as const;

// ─── Section: Content Pillars ────────────────────────────────────────────────

export const aboutContentPillars = {
  tagline: "On the Blog",
  headline: "What I Write About",
  description:
    "Practical, experience-driven content for engineering leaders and senior devs navigating modernization and AI adoption.",
} as const;

// ─── Section: CTA ────────────────────────────────────────────────────────────

export const aboutCta = {
  tagline: "Ready to Start?",
  headline: "Find Out Where Your Angular App Stands",
  subtitle:
    "Take the free 3-minute assessment across 5 dimensions and get your personalized action plan.",
  primaryCta: { text: "Take the Free Assessment", href: "/assessment" },
} as const;
