import Link from "next/link";
import { Zap, RefreshCw, Timer, Hexagon } from "lucide-react";
import { contentPillars } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  RefreshCw,
  Timer,
  Hexagon,
};

const accentMap: Record<string, { iconCircle: string; link: string }> = {
  purple: { iconCircle: "bg-[rgba(99,102,241,0.12)] text-[#818CF8]", link: "text-[#818CF8]" },
  indigo: { iconCircle: "bg-[rgba(94,234,212,0.12)] text-[#5EEAD4]", link: "text-[#5EEAD4]" },
  teal: { iconCircle: "bg-[rgba(251,191,36,0.12)] text-[#FBBF24]", link: "text-[#FBBF24]" },
  amber: { iconCircle: "bg-[rgba(196,181,253,0.12)] text-[#C4B5FD]", link: "text-[#C4B5FD]" },
};

export function ContentPillars() {
  return (
    <Section>
      <Reveal>
        <div className="mb-14 text-center">
          <Tagline>{contentPillars.eyebrow}</Tagline>
          <h2 className="mb-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
            {contentPillars.headline}
          </h2>
          <p className="mx-auto max-w-[580px] text-[1.125rem] leading-[1.7] text-[#94A3B8]">
            {contentPillars.description}
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contentPillars.items.map((item, i) => {
          const Icon = iconMap[item.icon];
          const accent = accentMap[item.accent];

          return (
            <Reveal key={item.title} delay={i * 100} className="h-full">
              <Link href={item.href} className="group block h-full">
                <GlassCard className="flex h-full items-start gap-4 p-5 sm:gap-6 sm:p-8">
                  <IconCircle size="lg" className={accent.iconCircle}>
                    {Icon && <Icon className="h-6 w-6" />}
                  </IconCircle>
                  <div>
                    <h3 className="text-[1.15rem] font-semibold text-foreground transition-colors md:group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.9rem] leading-[1.65] text-[#8B9DB8]">
                      {item.description}
                    </p>
                    <span className={`mt-3 inline-block text-[0.8rem] font-semibold transition-colors ${accent.link}`}>
                      Browse articles
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
