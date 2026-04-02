import type { NavItem } from "@/types/assessment";

export const logoText = "FrontendMinds";

export const navItems: NavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
];

export const navCta = {
  text: "Take the Scorecard",
  href: "/assessment",
} as const;

export const mobileMenuItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Services", href: "/services" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Scorecard", href: "/assessment" },
];
