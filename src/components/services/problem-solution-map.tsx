import Link from "next/link";
import { RefreshCw, Bot, Puzzle, Compass } from "lucide-react";
import { painPoints } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Bot,
  Puzzle,
  Compass,
};

export function ProblemSolutionMap() {
  return (
    <Section bg="muted">
      <Reveal>
        <Tagline>Sound familiar?</Tagline>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mb-8 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:mb-10 sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
          The Problems That Bring Teams to Us
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:gap-4 sm:grid-cols-2">
        {painPoints.map((point, i) => {
          const Icon = iconMap[point.icon];
          return (
            <Reveal key={point.quote} delay={(i + 1) * 100}>
              <GlassCard
                as="article"
                className="flex flex-col gap-3 border-l-[3px] px-4 py-5 md:px-5"
                style={{ borderLeftColor: point.borderColor }}
              >
                <div className="flex items-start gap-3">
                  <IconCircle
                    className="shrink-0"
                    style={{
                      backgroundColor: `${point.borderColor}1A`,
                      color: point.borderColor,
                    }}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </IconCircle>
                  <div>
                    <p className="text-[0.9rem] font-semibold leading-[1.4] text-foreground">
                      &ldquo;{point.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-[1.5] text-[#94A3B8]">
                      {point.explanation}
                    </p>
                  </div>
                </div>
                <Link
                  href={point.serviceHref}
                  className="self-start -ml-2 rounded-md px-2 py-2.5 text-[0.75rem] font-semibold text-indigo-400 transition-colors hover:bg-indigo-400/10 hover:text-indigo-300"
                >
                  {point.service}
                </Link>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
