import Link from "next/link";
import { RefreshCw, Layers, Sparkles, Bot, Rocket } from "lucide-react";
import { aboutFramework } from "@/lib/content/about";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Layers,
  Sparkles,
  Bot,
  Rocket,
};

export function AboutFramework() {
  return (
    <Section>
      <Reveal>
        <div className="mb-14 text-center">
          <Tagline>{aboutFramework.tagline}</Tagline>
          <h2 className="mb-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
            {aboutFramework.headline}
          </h2>
          <p className="mx-auto max-w-[580px] text-[1.125rem] leading-[1.7] text-[#94A3B8]">
            {aboutFramework.subtitle}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aboutFramework.dimensions.map((dim, i) => {
          const Icon = iconMap[dim.icon];

          return (
            <Reveal key={dim.name} delay={i * 100} className="h-full">
              <GlassCard
                className="flex h-full items-start gap-4 border-l-[3px] p-5 sm:gap-5 sm:p-6"
                style={{ borderLeftColor: dim.color }}
              >
                <IconCircle
                  size="lg"
                  style={{
                    backgroundColor: `${dim.color}1A`,
                    color: dim.color,
                  }}
                >
                  {Icon && <Icon className="h-6 w-6" />}
                </IconCircle>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-foreground">
                    {dim.name}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-[1.65] text-[#8B9DB8]">
                    {dim.description}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={500}>
        <div className="mt-10 text-center">
          <Link
            href={aboutFramework.cta.href}
            className={cn(
              buttonVariants({ shape: "pill" }),
              "h-auto py-[1.1rem] text-base font-semibold sm:px-[2.75rem]"
            )}
          >
            {aboutFramework.cta.text}
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}
