import Link from "next/link";
import { howItWorks } from "@/lib/content/landing";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";

const stepColors = [
  "border-[#6366F1] text-[#818CF8]",
  "border-[#34D399] text-[#34D399]",
  "border-[#FBBF24] text-[#FBBF24]",
] as const;

export function HowItWorks() {
  return (
    <Section bg="muted" width="narrow">
      <Reveal>
        <Tagline>{howItWorks.eyebrow}</Tagline>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mb-12 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
          {howItWorks.headline}
        </h2>
      </Reveal>

      <div className="relative pl-10 sm:pl-16">
        <div className="absolute left-[14px] top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-indigo-500 to-indigo-500/10 sm:left-[22px]" />

        {howItWorks.steps.map((step, i) => {
          const isLast = i === howItWorks.steps.length - 1;
          return (
            <Reveal key={step.number} delay={200 + i * 150}>
              <div className={`relative ${isLast ? "" : "pb-14"}`}>
                <div
                  className={`absolute -left-10 top-0.5 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-[#0F172A] text-[0.85rem] font-extrabold sm:-left-16 sm:h-[46px] sm:w-[46px] sm:text-[0.95rem] ${stepColors[i]}`}
                >
                  {step.number}
                </div>
                <h3 className="mb-3 text-[1.3rem] font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-[480px] text-[0.9rem] leading-[1.65] text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200 + howItWorks.steps.length * 150}>
        <div className="mt-12 sm:pl-16">
          <Link
            href={howItWorks.ctaHref}
            className={cn(
              buttonVariants({ shape: "pill" }),
              "h-auto w-full py-4 text-[0.9375rem] font-semibold sm:w-auto sm:px-[2.25rem]"
            )}
          >
            {howItWorks.ctaText}
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
