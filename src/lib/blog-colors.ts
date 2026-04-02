import type { CategorySlug } from "@/lib/blog-categories";

export const CATEGORY_COLORS: Record<CategorySlug, string> = {
  "ai-for-frontend": "#93C5FD",
  "angular-ai": "#5EEAD4",
  "dev-workflow": "#818CF8",
  tutorials: "#FBBF24",
  "case-studies": "#C4B5FD",
  strategy: "#F87171",
};

const FALLBACK_COLOR = "#6366F1";

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category as CategorySlug] ?? FALLBACK_COLOR;
}

export function getCategoryBadgeStyle(category: string): React.CSSProperties {
  const color = getCategoryColor(category);
  return {
    backgroundColor: `${color}26`,
    color,
  };
}

export function getCategoryGradient(category: string): string {
  const color = getCategoryColor(category);
  return `linear-gradient(135deg, ${color}14 0%, #6366F10D 100%)`;
}
