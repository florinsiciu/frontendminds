import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/blog";
import { CATEGORIES, type CategorySlug } from "@/lib/blog-categories";
import { siteConfig } from "@/lib/config/site";
import { mdxComponents } from "@/components/blog/mdx-components";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { PostHeader } from "@/components/blog/post-header";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { RelatedPosts } from "@/components/blog/related-posts";
import { AssessmentCta } from "@/components/blog/assessment-cta";
import { FaqSection } from "@/components/blog/faq-section";
import { LeadMagnet } from "@/components/landing/lead-magnet";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | FrontendMinds`,
    description: post.description,
    alternates: {
      canonical: `${siteConfig.baseUrl}/blog/${slug}`,
    },
    ...(post.draft && { robots: { index: false, follow: false } }),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Florin Siciu"],
      ...(post.image && { images: [post.image] }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category, 2);

  const categoryLabel = CATEGORIES[post.category as CategorySlug] ?? post.category;

  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: siteConfig.author,
      url: siteConfig.social.linkedin,
      sameAs: [
        siteConfig.social.linkedin,
        siteConfig.social.github,
        siteConfig.social.twitter,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.baseUrl,
    },
    mainEntityOfPage: `${siteConfig.baseUrl}/blog/${slug}`,
    articleSection: categoryLabel,
    ...(post.image && { image: post.image }),
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.baseUrl}/blog/${slug}`,
      },
    ],
  };

  return (
    <div className="bg-dot-grid">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <ReadingProgress />
      <PostHeader post={post} />

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 md:pb-24">
        <TableOfContents content={post.content} />

        <article className="leading-relaxed">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: "one-dark-pro" }]],
              },
            }}
          />
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-8 border-t border-white/[0.06] pt-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface px-3 py-1 text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {post.faq && post.faq.length > 0 && <FaqSection items={post.faq} />}

      <RelatedPosts posts={related} />

      <AssessmentCta />

      <LeadMagnet />
    </div>
  );
}
