import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/types/assessment";
import { CATEGORIES, type CategorySlug } from "@/lib/blog";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { getCategoryColor, getCategoryBadgeStyle, getCategoryGradient } from "@/lib/blog-colors";

export function BlogPostRow({ post, index = 0 }: { post: BlogPostMeta; index?: number }) {
  const color = getCategoryColor(post.category);
  const badgeStyle = getCategoryBadgeStyle(post.category);
  const label = CATEGORIES[post.category as CategorySlug] ?? post.category;

  return (
    <Reveal delay={Math.min(index * 100, 500)}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <GlassCard className="grid grid-cols-1 overflow-hidden md:grid-cols-[160px_1fr]">
          {/* Image area */}
          <div
            className={`relative ${post.image ? "aspect-[16/9]" : "aspect-[3/1]"} md:aspect-auto`}
            style={{ background: post.image ? undefined : getCategoryGradient(post.category) }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[3px] md:inset-y-0 md:left-0 md:h-auto md:w-[3px]"
              style={{ backgroundColor: color }}
            />
            {post.image && (
              <Image src={post.image} alt="" fill className="object-cover" />
            )}
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <div className="mb-2 flex items-center gap-3">
              <span
                className="rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase"
                style={badgeStyle}
              >
                {label}
              </span>
              <span className="text-xs text-muted-foreground">{post.readingTime}</span>
            </div>

            <h2 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <time className="text-xs text-[#7A8CA3]">{formatDate(post.date)}</time>
              <span className="text-sm font-medium text-primary">Read</span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </Reveal>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
