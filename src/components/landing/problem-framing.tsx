import Link from "next/link";
import { RefreshCw, Timer, Cog, Hexagon } from "lucide-react";
import { problemFraming } from "@/lib/content/landing";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Timer,
  Cog,
  Hexagon,
};

const colorMap: Record<string, { border: string; iconBg: string }> = {
  blue: {
    border: "border-l-[#93C5FD]",
    iconBg: "bg-[rgba(147,197,253,0.1)] text-[#93C5FD]",
  },
  amber: {
    border: "border-l-[#FBBF24]",
    iconBg: "bg-[rgba(251,191,36,0.1)] text-[#FBBF24]",
  },
  purple: {
    border: "border-l-[#C4B5FD]",
    iconBg: "bg-[rgba(196,181,253,0.1)] text-[#C4B5FD]",
  },
  red: {
    border: "border-l-[#F87171]",
    iconBg: "bg-[rgba(248,113,113,0.1)] text-[#F87171]",
  },
};

export function ProblemFraming() {
  return (
    <Section bg="muted">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
        {/* Left side: copy */}
        <div className="flex flex-1 flex-col justify-center">
          <Reveal>
            <Tagline>{problemFraming.eyebrow}</Tagline>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mb-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
              You&apos;re shipping features — but something{" "}
              <em className="font-heading italic text-indigo-400">feels off</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mb-6 max-w-[580px] text-[1.125rem] leading-[1.7] text-[#94A3B8]">
              {problemFraming.closingLine}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <Link
              href={problemFraming.transitionCta.href}
              className="-ml-3 inline-block rounded-md px-3 py-2.5 text-[0.9rem] font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
            >
              {problemFraming.transitionCta.text}
            </Link>
          </Reveal>
        </div>

        {/* Right side: cards */}
        <div className="flex flex-1 flex-col gap-4">
          {problemFraming.situations.map((situation, i) => {
            const Icon = iconMap[situation.icon];
            const colors = colorMap[situation.dimensionColor];
            return (
              <Reveal key={situation.quote} delay={(i + 1) * 100}>
                <GlassCard
                  className={`flex items-start gap-4 border-l-[3px] px-6 py-5 ${colors.border}`}
                >
                  <IconCircle className={colors.iconBg}>
                    {Icon && <Icon className="h-5 w-5" />}
                  </IconCircle>
                  <p className="text-[0.9rem] leading-[1.65] text-muted-foreground">
                    &ldquo;{situation.quote}&rdquo;
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
