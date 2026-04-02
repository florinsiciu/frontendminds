import { Feed } from "feed";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config/site";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: "FrontendMinds",
    description: siteConfig.description,
    id: siteConfig.baseUrl,
    link: siteConfig.baseUrl,
    language: "en",
    copyright: `© ${new Date().getFullYear()} FrontendMinds`,
    author: {
      name: "Florin Siciu",
      link: `${siteConfig.baseUrl}/about`,
    },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.baseUrl}/blog/${post.slug}`,
      link: `${siteConfig.baseUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      author: [{ name: "Florin Siciu" }],
      category: [{ name: post.category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
