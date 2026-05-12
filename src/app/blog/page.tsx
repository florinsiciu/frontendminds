import type { Metadata } from "next";
import { getAllPosts, CATEGORIES } from "@/lib/blog";
import { pageSeo } from "@/lib/content/seo";
import { siteConfig } from "@/lib/config/site";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPostRow } from "@/components/blog/blog-post-row";
import { LeadMagnet } from "@/components/landing/lead-magnet";
import { Section } from "@/components/ui/section";

export const metadata: Metadata = {
  title: pageSeo.blog.title,
  description: pageSeo.blog.description,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category;
  const allPosts = getAllPosts().filter((p) => !p.draft);
  const posts = category ? allPosts.filter((p) => p.category === category) : allPosts;

  const uniqueCategories = [...new Set(allPosts.map((p) => p.category))].filter(
    (c) => c in CATEGORIES
  );

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FrontendMinds Blog",
    description: pageSeo.blog.description,
    url: `${siteConfig.baseUrl}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: allPosts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteConfig.baseUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.baseUrl}/blog` },
    ],
  };

  return (
    <div className="bg-dot-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
