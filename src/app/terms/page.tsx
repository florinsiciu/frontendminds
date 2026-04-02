import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";
import { termsOfService } from "@/lib/content/legal";

export const metadata: Metadata = {
  title: pageSeo.terms.title,
  description: pageSeo.terms.description,
};

export default function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold">{termsOfService.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {termsOfService.lastUpdated}
      </p>

      <div className="mt-10 space-y-8">
        {termsOfService.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            <div className="mt-2 whitespace-pre-line text-muted-foreground">
              {section.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
