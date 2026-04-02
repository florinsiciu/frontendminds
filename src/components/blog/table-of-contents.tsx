"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const headings = extractHeadings(content);
  const activeId = useActiveHeading(headings.map((h) => h.id));

  if (headings.length < 3) return null;

  return (
    <nav className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-[16px]">
      <p className="mb-3 text-[0.8rem] font-semibold text-foreground">Table of Contents</p>
      <ul className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 16}px` }}>
            <a
              href={`#${h.id}`}
              className={`text-sm transition-colors ${
                activeId === h.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function useActiveHeading(ids: string[]): string {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

function extractHeadings(mdxContent: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level });
  }

  return headings;
}
