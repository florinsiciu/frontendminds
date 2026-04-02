import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/assessment/quiz", "/assessment/unlock", "/assessment/results"] },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}
