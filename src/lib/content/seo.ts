import type { PageSeo } from "@/types/assessment";

// ─── Default Site Metadata ──────────────────────────────────────────────────

export const defaultSeo: PageSeo = {
  title: "FrontendMinds — How Modern Is Your Angular App?",
  description:
    "Practical insights, tools, and systems for developers building smarter web products. Angular modernization, AI workflows, and developer tooling.",
};

// ─── Per-Page Overrides ─────────────────────────────────────────────────────

export const pageSeo: Record<string, PageSeo> = {
  home: {
    title: "FrontendMinds — How Modern Is Your Angular App?",
    description:
      "Practical insights, tools, and systems for developers building smarter web products. Angular modernization, AI workflows, and developer tooling.",
  },
  assessment: {
    title: "Angular Modernization Assessment | FrontendMinds",
    description:
      "20 yes/no questions across 5 dimensions. Get your personalized Angular modernization score in under 3 minutes.",
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
    title: "Blog | FrontendMinds",
    description:
      "Practical articles on AI for frontend, Angular modernization, dev workflows, and tooling.",
  },
  newsletter: {
    title: "The Frontend Signal | FrontendMinds",
    description: "Practical AI + frontend insights delivered monthly. Tools that work, patterns that scale, and lessons from real implementation work.",
  },
  services: {
    title: "Services | FrontendMinds",
    description:
      "Angular modernization audits, AI tool stack rationalization, and consulting for dev teams.",
  },
  about: {
    title: "About | FrontendMinds",
    description:
      "FrontendMinds is a knowledge hub built by Florin Siciu for developers exploring practical AI in frontend work.",
  },
  contact: {
    title: "Contact | FrontendMinds",
    description:
      "Get in touch with FrontendMinds for consulting, partnerships, or general inquiries.",
  },
};

// ─── JSON-LD Structured Data ────────────────────────────────────────────────

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Practical insights, tools, and systems for developers building smarter web products. Angular modernization, AI workflows, and developer tooling.",
  sameAs: [
    "https://linkedin.com/in/florinsiciu",
    "https://github.com/florinsiciu",
    "https://x.com/nicusorsiciu",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "FrontendMinds",
  url: "https://frontendminds.com",
  description:
    "Practical insights, tools, and systems for developers building smarter web products.",
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
