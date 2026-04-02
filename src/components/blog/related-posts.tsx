import Link from "next/link";
import type { BlogPostMeta } from "@/types/assessment";
import { CATEGORIES, type CategorySlug } from "@/lib/blog";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { getCategoryColor, getCategoryBadgeStyle } from "@/lib/blog-colors";

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <Section bg="muted">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <Tagline>Keep Reading</Tagline>
          <h2 className="mb-8 font-heading text-2xl font-semibold text-foreground">
            Related Articles
          </h2>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => {
            const label = CATEGORIES[post.category as CategorySlug] ?? post.category;
            const color = getCategoryColor(post.category);
            const badgeStyle = getCategoryBadgeStyle(post.category);

            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <GlassCard
                  className="border-t-[3px] p-5"
                  style={{ borderTopColor: color }}
                >
                  <span
                    className="rounded-md px-2 py-0.5 text-[0.65rem] font-semibold uppercase"
                    style={badgeStyle}
                  >
                    {label}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {post.readingTime}
                  </span>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
