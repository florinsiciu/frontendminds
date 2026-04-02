import Link from "next/link";
import type { BlogPostMeta } from "@/types/assessment";
import { CATEGORIES, type CategorySlug } from "@/lib/blog";
import { GlassCard } from "@/components/ui/glass-card";
import { getCategoryColor, getCategoryBadgeStyle } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  featured = false,
  className,
}: {
  post: BlogPostMeta;
  featured?: boolean;
  className?: string;
}) {
  const categoryLabel = CATEGORIES[post.category as CategorySlug] ?? post.category;
  const color = getCategoryColor(post.category);
  const badgeStyle = getCategoryBadgeStyle(post.category);

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlassCard
        className={cn("h-full border-t-[3px]", featured ? "p-8" : "p-6", className)}
        style={{ borderTopColor: color }}
      >
        <div className={cn("flex items-center", featured ? "mb-5 gap-3" : "mb-4 gap-2")}>
          <span
            className="rounded-md px-[0.6rem] py-[0.2rem] text-[0.65rem] font-bold uppercase tracking-[0.05em]"
            style={badgeStyle}
          >
            {categoryLabel}
          </span>
          <span className="text-[0.75rem] text-[#7A8CA3]">{post.readingTime}</span>
        </div>
        <h3 className={cn(
          "mb-3 font-semibold text-foreground transition-colors group-hover:text-primary",
          featured
            ? "font-heading text-[1.35rem] leading-[1.3]"
            : "text-[1.05rem] leading-[1.35]"
        )}>
          {post.title}
        </h3>
        <p className={cn(
          "text-[#8B9DB8]",
          featured
            ? "mb-5 text-[0.875rem] leading-[1.65]"
            : "text-[0.8rem] leading-[1.65] line-clamp-3"
        )}>
          {post.description}
        </p>
        <time className={cn("text-[0.75rem] text-[#7A8CA3]", !featured && "mt-4 block")}>
          {formatDate(post.date)}
        </time>
      </GlassCard>
    </Link>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
