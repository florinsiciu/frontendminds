import type { PageSeo } from "@/types/assessment";

// ─── Default Site Metadata ──────────────────────────────────────────────────

export const defaultSeo: PageSeo = {
  title: "FrontendMinds — Angular Migration & Upgrade Consulting",
  description:
    "Helping CTOs and engineering managers modernize Angular applications. Free assessment, migration guides, and business case frameworks — based on 19 enterprise migrations.",
};

// ─── Per-Page Overrides ─────────────────────────────────────────────────────

export const pageSeo: Record<string, PageSeo> = {
  home: {
    title: "FrontendMinds — Angular Migration & Upgrade Consulting",
    description:
      "Helping CTOs and engineering managers modernize Angular applications. Free assessment, migration guides, and business case frameworks — based on 19 enterprise migrations.",
  },
  assessment: {
    title:
      "Free Angular Modernization Assessment — Score Your App in 3 Minutes | FrontendMinds",
    description:
      "20 yes/no questions across 5 dimensions. Get your personalized Angular modernization score with instant results — no sales call required.",
  },
  quiz: {
    title: "Assessment Quiz | FrontendMinds",
    description:
      "Answer questions about your Angular project to receive a modernization score.",
    noindex: true,
  },
  unlock: {
    title: "Unlock Results | FrontendMinds",
    description:
      "Enter your email to see your personalized Angular modernization score and recommendations.",
    noindex: true,
  },
  results: {
    title: "Your Results | FrontendMinds",
    description:
      "View your Angular modernization score breakdown and personalized recommendations.",
    noindex: true,
  },
  privacy: {
    title: "Privacy Policy | FrontendMinds",
    description:
      "Privacy policy for the Angular Modernization Scorecard by FrontendMinds.",
  },
  terms: {
    title: "Terms of Service | FrontendMinds",
    description:
      "Terms of service for the Angular Modernization Scorecard by FrontendMinds.",
  },
  blog: {
    title: "Angular Migration & Upgrade Blog | FrontendMinds",
    description:
      "Angular migration guides, upgrade strategies, and business case frameworks for engineering managers and CTOs — based on 19 enterprise migration projects.",
  },
  newsletter: {
    title: "The Frontend Signal | FrontendMinds",
    description: "Practical AI + frontend insights delivered monthly. Tools that work, patterns that scale, and lessons from real implementation work.",
  },
  services: {
    title: "Angular Consulting & Migration Services | FrontendMinds",
    description:
      "Angular migration consulting, modernization audits, and AI tool stack rationalization for enterprise teams. From assessment to implementation — based on 19 migration projects.",
  },
  about: {
    title: "About Florin Siciu — Angular Migration Consultant | FrontendMinds",
    description:
      "8+ years of Angular architecture. 19 enterprise migration projects, 13 shared libraries, zero production downtime. Creator of the 5-Dimension Angular Modernization Framework.",
  },
  contact: {
    title: "Contact — Angular Consulting & Audit | FrontendMinds",
    description:
      "Get in touch about Angular migration consulting, modernization audits, or AI tool stack rationalization. Response within 1-2 business days.",
  },
};

// ─── JSON-LD Structured Data ────────────────────────────────────────────────

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Helping CTOs and engineering managers modernize Angular applications. Free assessment, migration guides, and business case frameworks — based on 19 enterprise migrations.",
  sameAs: [
    "https://linkedin.com/in/florinsiciu",
    "https://github.com/florinsiciu",
    "https://x.com/FlorinSiciu",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Helping CTOs and engineering managers modernize Angular applications. Free assessment, migration guides, and business case frameworks.",
  publisher: {
    "@type": "Organization",
    name: "FrontendMinds",
  },
};

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does the Angular Modernization Assessment take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The assessment consists of 20 yes/no questions and takes under 3 minutes to complete.",
      },
    },
    {
      "@type": "Question",
      name: "What does the assessment measure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The assessment evaluates your Angular project across 5 dimensions: Migration & Version Health, Codebase Architecture, Modern Angular Adoption, AI & Development Governance, and Delivery & Talent Readiness.",
      },
    },
    {
      "@type": "Question",
      name: "Is the assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, the assessment is completely free. You'll receive a personalized score and recommendations at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I complete the assessment?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll see your score breakdown across all 5 dimensions, receive a personalized diagnosis, and have the option to book a free strategy call to discuss your results.",
      },
    },
  ],
};
