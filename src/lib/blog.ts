import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "@/types/assessment";

export { CATEGORIES, type CategorySlug } from "@/lib/blog-categories";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function parseMdxFile(filePath: string, slug: string): BlogPostMeta & { content: string } {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    lastUpdated: data.lastUpdated,
    category: data.category ?? "",
    author: data.author ?? "florin-siciu",
    image: data.image,
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    draft: data.draft ?? false,
    readingTime: estimateReadingTime(content),
    faq: data.faq,
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { content: _, ...meta } = parseMdxFile(path.join(BLOG_DIR, file), slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const parsed = parseMdxFile(filePath, slug);
  return parsed;
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(currentSlug);
  const currentTags = new Set(current?.tags ?? []);
  const allOther = getAllPosts().filter((p) => p.slug !== currentSlug);

  const sameCategory = allOther.filter((p) => p.category === category);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const remaining = allOther
    .filter((p) => p.category !== category)
    .sort((a, b) => {
      const aOverlap = a.tags.filter((t) => currentTags.has(t)).length;
      const bOverlap = b.tags.filter((t) => currentTags.has(t)).length;
      return bOverlap - aOverlap;
    });

  return [...sameCategory, ...remaining].slice(0, limit);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
