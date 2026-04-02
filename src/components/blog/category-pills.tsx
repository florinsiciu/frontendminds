"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORIES, type CategorySlug } from "@/lib/blog-categories";
import { getCategoryColor } from "@/lib/blog-colors";

export function CategoryPills({ categories }: { categories: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get("category") ?? "";

  function select(slug: string) {
    const url = slug ? `/blog?category=${slug}` : "/blog";
    router.push(url, { scroll: false });
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => select("")}
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          !active
            ? "bg-primary text-primary-foreground"
            : "border border-white/10 bg-white/[0.04] text-muted-foreground hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((slug) => {
        const color = getCategoryColor(slug);
        const isActive = active === slug;
        const label = CATEGORIES[slug as CategorySlug] ?? slug;

        return (
          <button
            key={slug}
            onClick={() => select(slug)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive ? "bg-primary text-primary-foreground" : ""
            }`}
            style={
              isActive
                ? undefined
                : {
                    backgroundColor: `${color}0F`,
                    borderColor: `${color}1F`,
                    border: `1px solid ${color}1F`,
                    color,
                  }
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
