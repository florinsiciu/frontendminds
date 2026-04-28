import type { SocialLink } from "@/types/assessment";

export const copyright = `© ${new Date().getFullYear()} FrontendMinds. All rights reserved.`;

export const footerNav = [
  // { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Scorecard", href: "/assessment" },
] as const;

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/florinsiciu",
    icon: "Linkedin",
  },
  {
    label: "GitHub",
    url: "https://github.com/florinsiciu",
    icon: "Github",
  },
  {
    label: "X (Twitter)",
    url: "https://x.com/nicusorsiciu",
    icon: "Twitter",
  },
];

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
