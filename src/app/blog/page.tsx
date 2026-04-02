import type { Metadata } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/blog";
import { pageSeo } from "@/lib/content/seo";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPostRow } from "@/components/blog/blog-post-row";
import { LeadMagnet } from "@/components/landing/lead-magnet";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
};

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const allPosts = getAllPosts();
  const posts = category ? allPosts.filter((p) => p.category === category) : allPosts;

  const uniqueCategories = [...new Set(allPosts.map((p) => p.category))].filter(
    (c) => c in CATEGORIES
  );

  return (
    <div className="bg-dot-grid">
      <BlogHero categories={uniqueCategories} postCount={allPosts.length} />

      <Section width="medium" className="pt-8 md:pt-12">
        <div className="mx-auto max-w-4xl">
          {posts.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              No posts in this category yet. Check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {posts.map((post, i) => (
                <BlogPostRow key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </Section>

      <LeadMagnet />
    </div>
  );
}
