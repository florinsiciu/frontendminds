import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.baseUrl}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.baseUrl}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteConfig.baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.baseUrl}/assessment`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteConfig.baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteConfig.baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
