import type { DiagnosticPattern } from "@/types/assessment";

export const DIAGNOSTIC_PATTERNS: readonly DiagnosticPattern[] = [
  // ─── Migration & Version Health (q1–q4) ───────────────────────────────────

  {
    id: "legacy_trapped",
    name: "Legacy Trapped",
    triggers: [
      { questionId: "q1", expectedAnswer: false },
      { questionId: "q2", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "Your app is running an outdated Angular version AND still carries AngularJS remnants. This is a compounding problem — every month you delay makes the eventual migration larger and riskier. You're accumulating two generations of technical debt simultaneously.",
    ctoSummary:
      "Your application runs on deprecated technology with legacy framework remnants. This creates compounding maintenance costs, growing security exposure, and an increasingly difficult hiring environment as fewer developers want to work with outdated stacks.",
    salesTalkTrack:
      "I noticed you're on an older Angular version and still have AngularJS code in the mix. That's actually the most expensive pattern I see — you're paying the maintenance tax on two generations of framework at once. How is that affecting your team's ability to ship?",
    recommendedAction:
      "Prioritize a phased migration plan: first eliminate AngularJS remnants, then establish a path to a current Angular version. Don't try to do both at once.",
  },

  {
    id: "upgrade_fragility",
    name: "Upgrade Fragility",
    triggers: [
      { questionId: "q1", expectedAnswer: true },
      { questionId: "q4", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "You're on a current Angular version, which is good — but your team can't complete a major version upgrade within 2 weeks. This means you're current today but fragile tomorrow. When Angular 19 or 20 ships, you'll fall behind again because the upgrade process is too painful.",
    ctoSummary:
      "While your technology is currently up to date, the team's inability to upgrade quickly creates a recurring risk. Each major framework release becomes a multi-week disruption rather than a routine maintenance task, threatening delivery timelines.",
    salesTalkTrack:
      "Your Angular version is current, which puts you ahead of most teams I work with. But the fact that upgrades take more than 2 weeks tells me there's friction in the process. What usually makes upgrades painful — is it test failures, breaking dependencies, or something else?",
    recommendedAction:
      "Invest in upgrade automation: update scripts, comprehensive test coverage on upgrade-sensitive areas, and a documented upgrade playbook your team can repeat quarterly.",
  },

  {
    id: "angularjs_debt",
    name: "AngularJS Debt",
    triggers: [{ questionId: "q2", expectedAnswer: false }],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "You still have AngularJS (v1.x) code in your codebase. AngularJS has been end-of-life since December 2021 — no security patches, no bug fixes, no community support. Every day this code runs in production is a day you're exposed to unpatched vulnerabilities.",
    ctoSummary:
      "Your application contains end-of-life framework code that no longer receives security updates. This represents a compliance risk, a growing maintenance burden, and a significant barrier to hiring — experienced developers actively avoid AngularJS codebases.",
    salesTalkTrack:
      "The AngularJS code is a big one. It's been end-of-life since 2021, so you're running unsupported code in production. Is security review flagging this, or has it been flying under the radar?",
    recommendedAction:
      "Audit all AngularJS-dependent modules. Create a containment strategy — isolate AngularJS code behind clear boundaries, then systematically replace it module by module.",
  },

  {
    id: "dependency_rot",
    name: "Dependency Rot",
    triggers: [
      { questionId: "q3", expectedAnswer: false },
      { questionId: "q4", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "Your third-party dependencies aren't being updated regularly AND your team can't upgrade Angular quickly. These two problems feed each other — outdated dependencies often block framework upgrades, and without regular updates the gap between your versions and current releases keeps widening.",
    ctoSummary:
      "Both framework and dependency maintenance have fallen behind schedule. This creates an expanding gap that becomes more expensive to close over time, while increasing exposure to known security vulnerabilities in outdated packages.",
    salesTalkTrack:
      "Dependencies aren't getting updated and upgrades are slow — that's a classic compounding pattern. Usually what happens is outdated deps block the Angular upgrade, and the Angular upgrade gets delayed so the deps fall even further behind. Has your team experienced that cycle?",
    recommendedAction:
      "Establish a monthly dependency review process and quarterly Angular upgrade cadence. Start with a full dependency audit to identify which packages are blocking upgrades.",
  },

  // ─── Codebase Architecture (q5–q8) ────────────────────────────────────────

  {
    id: "monolith_trap",
    name: "Monolith Trap",
    triggers: [
      { questionId: "q5", expectedAnswer: false },
      { questionId: "q8", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "Your codebase lacks clear feature boundaries AND your modules can't be developed or tested independently. This is a monolith trap — everything is coupled to everything else, so changing one thing risks breaking something unrelated. This is the #1 reason teams slow down as codebases grow.",
    ctoSummary:
      "Your codebase has become tightly coupled with no clear module boundaries. This directly impacts delivery speed — developers cannot work on features independently, testing is unreliable, and every change carries unpredictable side effects. This pattern typically worsens as the team grows.",
    salesTalkTrack:
      "No clear boundaries and no independent modules — that's the monolith trap. I bet your team experiences a lot of merge conflicts and unexpected test failures when multiple people work on different features. Is that accurate?",
    recommendedAction:
      "Start with a dependency mapping exercise to understand the coupling. Then define feature boundaries and enforce them with linting rules or an Nx workspace structure.",
  },

  {
    id: "paper_standards",
    name: "Paper Standards",
    triggers: [
      { questionId: "q6", expectedAnswer: true },
      { questionId: "q7", expectedAnswer: false },
    ],
    priority: "insight",
    isCrossDimension: false,
    championSummary:
      "You have documented architectural standards — that's great — but haven't had an architecture review in the past year. Standards that aren't actively enforced tend to drift. The codebase evolves daily, but if nobody's checking whether the standards still match reality, they become decorative.",
    ctoSummary:
      "Architectural standards exist on paper but haven't been validated through a recent review. This commonly leads to gradual divergence between documented patterns and actual code, creating confusion for the team and increasing onboarding time for new developers.",
    salesTalkTrack:
      "You've got standards documented, which puts you ahead of most teams. But without a review in the past year, those standards may not reflect how the team actually builds things today. How does the team decide 'the right way' to build something day-to-day?",
    recommendedAction:
      "Schedule a quarterly architecture review. Compare documented standards against actual codebase patterns — update the docs or the code, whichever is out of date.",
  },

  {
    id: "boundaries_without_independence",
    name: "Boundaries Without Independence",
    triggers: [
      { questionId: "q5", expectedAnswer: true },
      { questionId: "q8", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "Your codebase has clear feature boundaries, but your modules still can't be developed and tested independently. This means the boundaries are structural (folders, naming) but not functional — there are hidden dependencies between modules that prevent true isolation.",
    ctoSummary:
      "While your codebase appears well-organized, the modules remain interdependent. This limits the team's ability to work in parallel and means that changes in one area can still cause unexpected failures in another, slowing delivery.",
    salesTalkTrack:
      "You've got the structure in place with clear boundaries, but the modules aren't truly independent yet. That usually means there are shared services or circular dependencies tying things together beneath the surface. What's making it hard to test modules in isolation?",
    recommendedAction:
      "Map the actual dependency graph between modules. Identify shared services creating coupling and extract them into clean, versioned interfaces.",
  },

  // ─── Modern Angular Adoption (q9–q12) ─────────────────────────────────────

  {
    id: "piecemeal_modernization",
    name: "Piecemeal Modernization",
    triggers: [
      { questionId: "q9", expectedAnswer: true },
      { questionId: "q10", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "You've adopted standalone components but don't have a consistent reactivity strategy. This means your codebase speaks two dialects — new Angular patterns in some places, old approaches in others. In the short term, this actually creates more confusion than having one consistent (even if older) approach.",
    ctoSummary:
      "The team has partially adopted modern patterns without a unified strategy. This creates inconsistency in the codebase — some areas use new approaches while others use legacy patterns — increasing the learning curve for new developers and making code reviews less reliable.",
    salesTalkTrack:
      "You've started with standalone components, which is a good instinct. But without a reactivity strategy, you're essentially modernizing in patches — some code is new Angular, some is old. Was the standalone adoption a deliberate initiative or did it happen organically?",
    recommendedAction:
      "Before continuing the standalone migration, align the team on a single reactivity approach (Signals, RxJS, or a documented hybrid). Consistency matters more than which approach you pick.",
  },

  {
    id: "refactoring_paralysis",
    name: "Refactoring Paralysis",
    triggers: [{ questionId: "q12", expectedAnswer: false }],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "Your team doesn't trust the test suite enough to refactor with confidence. This is a fundamental blocker — without test confidence, the team will avoid touching risky code, which means technical debt accumulates in exactly the areas that need the most improvement.",
    ctoSummary:
      "The engineering team lacks confidence in the automated test suite, which prevents necessary code improvements. Teams in this situation tend to work around problems rather than fixing them, leading to increasing complexity and slower delivery over time.",
    salesTalkTrack:
      "Not trusting the test suite is one of the most common patterns I see, and it's one of the most impactful to fix. When the team can't refactor with confidence, tech debt just piles up. Are there specific areas of the codebase that people are afraid to touch?",
    recommendedAction:
      "Start with critical-path test coverage — identify the most-changed files and the highest-risk modules, then add focused integration tests there first. You don't need 100% coverage, you need confidence in the code you actually change.",
  },

  {
    id: "legacy_lock",
    name: "Legacy Lock",
    triggers: [
      { questionId: "q9", expectedAnswer: false },
      { questionId: "q12", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "You haven't adopted standalone components AND your team doesn't trust the test suite. This is a catch-22: you can't modernize safely without tests, but you can't justify the test investment without a modernization plan. Your codebase is effectively locked in its current state.",
    ctoSummary:
      "The codebase is stuck — modern patterns haven't been adopted, and the testing infrastructure doesn't support safe changes. This creates a vicious cycle where the team can't modernize because it's too risky, and the risk keeps growing because nothing is being modernized.",
    salesTalkTrack:
      "No standalone components and no test confidence — that's what I call Legacy Lock. It's a catch-22: you can't modernize safely without tests, and it's hard to justify the test investment without a modernization plan. Has the team tried to modernize before and pulled back because of risk?",
    recommendedAction:
      "Break the cycle with a dual investment: pick one bounded module, add test coverage for it, then modernize it. Use that success as proof-of-concept for the broader initiative.",
  },

  // ─── AI & Development Governance (q13–q16) ────────────────────────────────

  {
    id: "ai_wild_west",
    name: "AI Wild West",
    triggers: [{ questionId: "q14", expectedAnswer: false }],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "AI-generated code isn't held to the same review standards as human code. As AI tools become more prevalent, this gap creates a growing quality risk — AI-generated code that bypasses normal review can introduce subtle bugs, security issues, or architectural violations that compound over time.",
    ctoSummary:
      "AI-generated code contributions are not subject to the same quality controls as human-written code. As AI adoption accelerates, this governance gap creates escalating risk around code quality, security, and architectural consistency.",
    salesTalkTrack:
      "AI code not getting the same review treatment is a pattern I see in a lot of teams right now. The risk is subtle — AI-generated code often looks correct but doesn't follow your project's patterns. Has the team noticed any quality issues from AI-generated PRs?",
    recommendedAction:
      "Establish a clear policy: all code changes go through the same review process regardless of origin. Add AI-specific review checklist items (pattern compliance, security, test coverage).",
  },

  {
    id: "ai_guidelines_without_teeth",
    name: "AI Guidelines Without Teeth",
    triggers: [
      { questionId: "q13", expectedAnswer: true },
      { questionId: "q15", expectedAnswer: false },
    ],
    priority: "insight",
    isCrossDimension: false,
    championSummary:
      "You have AI usage guidelines but haven't configured AI tools to follow your project's architectural patterns. Guidelines tell developers what to do, but configured tools actually enforce it. Without project-specific configuration, AI tools generate generic code that doesn't match your codebase.",
    ctoSummary:
      "AI governance policies exist but aren't enforced through tooling configuration. This means AI tools generate code that doesn't align with your established patterns, creating inconsistency that requires additional review and rework.",
    salesTalkTrack:
      "Having AI guidelines is a good start, but if the AI tools aren't configured with your project context, they'll keep generating code that doesn't match your patterns. Have you looked into things like CLAUDE.md or custom rules to give AI tools your architectural context?",
    recommendedAction:
      "Create project-specific AI configuration files (e.g., CLAUDE.md, cursor rules) that document your architectural patterns, naming conventions, and preferred approaches.",
  },

  // ─── Delivery & Talent Readiness (q17–q20) ────────────────────────────────

  {
    id: "talent_leadership_gap",
    name: "Talent & Leadership Gap",
    triggers: [
      { questionId: "q17", expectedAnswer: false },
      { questionId: "q20", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "You can't fill Angular positions quickly AND leadership doesn't budget for modernization. This is an organizational crisis — the codebase is making it hard to hire, but leadership isn't investing in the changes that would make the codebase attractive to talent. The longer this persists, the worse both problems get.",
    ctoSummary:
      "The organization faces a dual challenge: difficulty attracting Angular talent combined with insufficient investment in modernization. This creates a downward spiral — an aging codebase repels talent, and understaffing prevents the improvements that would attract them.",
    salesTalkTrack:
      "Can't hire fast enough and leadership isn't budgeting for modernization — that's a tough spot. Usually what I see is that the hiring difficulty IS caused by the codebase state. Good developers evaluate the tech stack before accepting. Is that something you've heard in candidate feedback?",
    recommendedAction:
      "Build a business case connecting modernization investment to hiring outcomes. Quantify the cost of unfilled positions and show how a modern stack improves candidate acceptance rates.",
  },

  {
    id: "delivery_gridlock",
    name: "Delivery Gridlock",
    triggers: [
      { questionId: "q18", expectedAnswer: false },
      { questionId: "q19", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: false,
    championSummary:
      "Your team can't deploy with confidence AND legacy patterns are blocking new features. This is delivery gridlock — every release feels risky, and the features you do ship take longer because you're working around legacy constraints. The team is moving slowly and anxiously.",
    ctoSummary:
      "Both deployment reliability and feature delivery are compromised. The team lacks confidence in releases while simultaneously being blocked by legacy patterns when building new capabilities. This directly impacts time-to-market and team morale.",
    salesTalkTrack:
      "No deployment confidence and legacy blocking features — that's what I call Delivery Gridlock. The team is probably spending a lot of energy on workarounds and manual testing. What does your release process look like right now?",
    recommendedAction:
      "Address deployment confidence first — it's the foundation. Invest in CI/CD hardening, staging environments, and rollback capability. Then tackle the legacy blockers with a targeted modernization plan.",
  },

  {
    id: "invisible_tech_debt",
    name: "Invisible Tech Debt",
    triggers: [
      { questionId: "q19", expectedAnswer: false },
      { questionId: "q20", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: false,
    championSummary:
      "Legacy patterns are blocking feature delivery BUT leadership doesn't understand or budget for modernization. Your tech debt is invisible to the people who control the budget. The team feels the pain daily, but it's not translating into investment because leadership doesn't see the connection between the old code and slow delivery.",
    ctoSummary:
      "Technical debt is actively impeding feature delivery, but this impact isn't visible to leadership. Without alignment between engineering constraints and business priorities, the gap between what the team needs and what gets funded continues to widen.",
    salesTalkTrack:
      "Legacy blocking features but leadership not budgeting for modernization — that tells me the tech debt is invisible upward. The team feels it every day but leadership sees it as 'engineering wants new toys.' Is that a fair characterization of the dynamic?",
    recommendedAction:
      "Translate tech debt into business metrics: track how much time is spent on workarounds vs. new features. Present modernization as a delivery investment, not a technical preference.",
  },

  // ─── Cross-Dimension Patterns ─────────────────────────────────────────────

  {
    id: "foundational_instability",
    name: "Foundational Instability",
    triggers: [
      { questionId: "q4", expectedAnswer: false },
      { questionId: "q18", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: true,
    championSummary:
      "Your team can't upgrade the framework quickly AND can't deploy with confidence. These are two foundational capabilities — version currency and deployment safety — and both are compromised. This means you're building on unstable ground: the platform itself is a source of risk rather than a foundation you can rely on.",
    ctoSummary:
      "Two foundational engineering capabilities are compromised: the ability to keep the technology platform current and the ability to deploy reliably. When both are degraded, every other engineering initiative carries elevated risk and takes longer than expected.",
    salesTalkTrack:
      "Slow upgrades and risky deployments — that's what I call Foundational Instability. These are the two things everything else depends on. When both are broken, every other improvement you try to make is harder than it should be. Which one causes more day-to-day pain for the team?",
    recommendedAction:
      "Stabilize deployments first (CI/CD, rollback, staging), then use that foundation to de-risk the upgrade process. Don't try to fix both simultaneously.",
  },

  {
    id: "untestable_monolith",
    name: "Untestable Monolith",
    triggers: [
      { questionId: "q8", expectedAnswer: false },
      { questionId: "q12", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: true,
    championSummary:
      "Your modules can't be tested independently AND the team doesn't trust the test suite. This combination means testing is structurally broken — you can't write reliable tests because the code is too coupled, and the existing tests are unreliable because they test too much at once. It's a quality confidence crisis.",
    ctoSummary:
      "The codebase structure prevents effective testing, and existing tests don't provide confidence. This means the team has no reliable safety net for changes, making every modification a risk to production stability.",
    salesTalkTrack:
      "Can't test modules independently and the team doesn't trust the tests that exist — that's the Untestable Monolith pattern. It usually means the tests are brittle because they're testing too many things at once. When tests fail, does the team investigate or just re-run them?",
    recommendedAction:
      "Start by extracting one high-value module behind a clean interface. Write focused tests for that module only. Use it as a template for gradually improving both modularity and test confidence.",
  },

  {
    id: "angularjs_anchor",
    name: "AngularJS Anchor",
    triggers: [
      { questionId: "q2", expectedAnswer: false },
      { questionId: "q19", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: true,
    championSummary:
      "AngularJS remnants are still in your codebase AND legacy patterns are blocking new feature delivery. The AngularJS code isn't just old — it's actively anchoring the entire codebase, preventing the team from shipping modern features. Every new feature has to work around the legacy constraints.",
    ctoSummary:
      "End-of-life framework code is not just a maintenance liability — it's actively blocking the delivery of new business capabilities. The team spends significant effort working around legacy constraints rather than building value.",
    salesTalkTrack:
      "AngularJS code that's actively blocking new features — that's an anchor dragging down the whole team. Usually the AngularJS modules are in critical paths that everything else depends on. Is that the case, or is it more spread out across the codebase?",
    recommendedAction:
      "Map which AngularJS modules are in the critical delivery path. Prioritize replacing those specific modules first — don't try to eliminate all AngularJS at once, focus on the code that's blocking features.",
  },

  {
    id: "change_anxiety",
    name: "Change Anxiety",
    triggers: [
      { questionId: "q12", expectedAnswer: false },
      { questionId: "q18", expectedAnswer: false },
    ],
    priority: "critical",
    isCrossDimension: true,
    championSummary:
      "Your team doesn't trust the test suite AND can't deploy with confidence. This creates a compounding cycle of anxiety — every change feels risky because tests don't catch issues, and every deployment feels risky because you're not sure what you're releasing. Teams in this state often slow down dramatically, avoiding changes to 'keep things stable.'",
    ctoSummary:
      "Both the testing safety net and deployment confidence are compromised. Engineering teams in this situation typically become increasingly conservative, avoiding necessary changes to minimize risk. This leads to slower delivery, accumulating technical debt, and declining team morale.",
    salesTalkTrack:
      "No test confidence and no deployment confidence — that's Change Anxiety. I bet the team has unwritten rules about which parts of the codebase to avoid touching. When was the last time a deployment caused a production incident?",
    recommendedAction:
      "Break the anxiety cycle with small wins: add monitoring and rollback capability to deployments first (quick confidence boost), then invest in test coverage for the highest-risk areas.",
  },

  {
    id: "modernization_hiring_paradox",
    name: "Modernization Hiring Paradox",
    triggers: [
      { questionId: "q17", expectedAnswer: false },
      { questionId: "q9", expectedAnswer: false },
    ],
    priority: "warning",
    isCrossDimension: true,
    championSummary:
      "You can't hire Angular developers quickly AND haven't adopted modern Angular patterns. These are connected — good developers evaluate the tech stack during interviews, and a codebase without modern patterns signals 'legacy maintenance work.' You can't modernize without people, but you can't attract people without modernizing.",
    ctoSummary:
      "Difficulty hiring Angular talent is linked to the lack of modern development patterns. Experienced developers increasingly evaluate technology currency during the hiring process. An outdated codebase signals maintenance-heavy work, reducing candidate interest and acceptance rates.",
    salesTalkTrack:
      "Can't hire fast enough and the codebase isn't using modern Angular — those are usually connected. Developers check the tech stack before accepting offers. Are candidates asking about your Angular version or architecture during interviews?",
    recommendedAction:
      "Start modernizing one visible area of the codebase. Use it as a hiring showcase — 'here's the direction we're heading.' Pair it with messaging about modernization investment in job postings.",
  },
] as const;
