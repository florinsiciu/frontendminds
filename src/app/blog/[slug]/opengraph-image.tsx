import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { CATEGORIES, type CategorySlug } from "@/lib/blog-categories";
import { CATEGORY_COLORS } from "@/lib/blog-colors";

export const alt = "FrontendMinds Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "FrontendMinds";
  const category = post
    ? (CATEGORIES[post.category as CategorySlug] ?? post.category)
    : "";
  const categoryColor = post
    ? (CATEGORY_COLORS[post.category as CategorySlug] ?? "#818CF8")
    : "#818CF8";
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "#0F172A",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top: category + reading time */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color: categoryColor,
              backgroundColor: `${categoryColor}22`,
            }}
          >
            {category}
          </div>
          {readingTime && (
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#94A3BB",
              }}
            >
              {readingTime}
            </div>
          )}
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 44 : 52,
              fontWeight: 700,
              color: "#F1F5F9",
              lineHeight: 1.2,
              maxWidth: "1060px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: branding + author */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                fontWeight: 700,
                color: "#F1F5F9",
                letterSpacing: "-0.02em",
              }}
            >
              Frontend
              <span style={{ color: "#818CF8" }}>Minds</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #6366F1, #34D399)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              FS
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#94A3BB",
              }}
            >
              Florin Siciu
            </div>
          </div>
        </div>

        {/* Accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${categoryColor}, #6366F1)`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
