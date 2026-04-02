import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "@/types/assessment";
import { CATEGORIES, type CategorySlug } from "@/lib/blog";
import { Reveal } from "@/components/ui/reveal";
import { getCategoryBadgeStyle } from "@/lib/blog-colors";

export function PostHeader({ post }: { post: BlogPost }) {
  const label = CATEGORIES[post.category as CategorySlug] ?? post.category;
  const badgeStyle = getCategoryBadgeStyle(post.category);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-6 pt-16 sm:px-6 md:pt-20">
      <Reveal>
        <Link
          href="/blog"
          className="-ml-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-base text-primary transition-colors hover:bg-white/[0.04] hover:text-accent"
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span
            className="rounded-md px-2.5 py-0.5 text-xs font-semibold uppercase"
            style={badgeStyle}
          >
            {label}
          </span>
          <span className="text-sm text-muted-foreground">{post.readingTime}</span>
          <span className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl">
          {post.title}
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-xs font-semibold text-white">
            FS
          </div>
          <span className="text-sm font-medium text-foreground">Florin Siciu</span>
        </div>

        <div className="mt-6 border-b border-white/[0.06]" />
      </Reveal>
    </div>
  );
}
