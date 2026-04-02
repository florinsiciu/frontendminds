import { Suspense } from "react";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";
import { CategoryPills } from "@/components/blog/category-pills";

export function BlogHero({
  categories,
  postCount,
}: {
  categories: string[];
  postCount: number;
}) {
  return (
    <Section className="bg-dot-grid relative overflow-hidden">
      {/* Indigo glow — matching homepage */}
      <div className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-indigo-500/[0.15] blur-[120px]" />
      {/* Emerald glow — matching homepage */}
      <div className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

      <div className="relative z-[1] mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-[1.1rem] py-[0.35rem] text-[0.7rem] text-[#A5B4FC]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-semibold tracking-[0.04em]">Latest insights</span>
          </span>
        </Reveal>

        <Reveal delay={100}>
          <Tagline>Insights &amp; Guides</Tagline>
        </Reveal>

        <Reveal delay={200}>
          <h1 className="font-heading text-[2.5rem] font-bold text-foreground md:text-[3rem]">
            The Blog
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mt-4 max-w-lg text-[1.05rem] text-muted-foreground">
            Practical articles on AI integration, Angular modernization, and developer workflows.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-8">
            <Suspense fallback={<div className="h-10" />}>
              <CategoryPills categories={categories} />
            </Suspense>
          </div>
        </Reveal>

        {postCount > 0 && (
          <Reveal delay={500}>
            <p className="mt-4 text-sm text-muted-foreground">
              {postCount} {postCount === 1 ? "article" : "articles"} published
            </p>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
