import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";

export function FeaturedArticles() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section bg="accent">
      <Reveal>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Tagline>Latest from the blog</Tagline>
            <h2 className="font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
              Featured Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center shrink-0 text-[0.875rem] font-semibold text-[#818CF8] transition-colors hover:text-indigo-300"
          >
            View all posts
          </Link>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr_1fr]">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 100}>
            <PostCard post={post} featured={i === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
