export const siteConfig = {
  name: "FrontendMinds",
  shortName: "FrontendMinds",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  author: "Florin Siciu",
  description:
    "Practical insights, tools, and systems for developers building smarter web products.",
  calendly: {
    baseUrl: "https://calendly.com/florinsiciu",
    eventSlug: "strategy-call",
    buildUrl: (utmSource?: string) => {
      const base = `${siteConfig.calendly.baseUrl}/${siteConfig.calendly.eventSlug}`;
      if (!utmSource) return base;
      return `${base}?utm_source=${encodeURIComponent(utmSource)}`;
    },
  },
  social: {
    linkedin: "https://linkedin.com/in/florinsiciu",
    github: "https://github.com/florinsiciu",
    twitter: "https://x.com/nicusorsiciu",
  },
} as const;
