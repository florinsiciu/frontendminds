import {
  RefreshCw,
  Puzzle,
  Zap,
  Shield,
  GitBranch,
  Bot,
} from "lucide-react";
import { aboutExperience } from "@/lib/content/about";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  Puzzle,
  Zap,
  Shield,
  GitBranch,
  Bot,
};

export function AboutExperience() {
  return (
    <Section bg="muted">
      <Reveal>
        <div className="mb-14 text-center">
          <Tagline>{aboutExperience.tagline}</Tagline>
          <h2 className="mb-5 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
            {aboutExperience.headline}
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {aboutExperience.items.map((item, i) => {
          const Icon = iconMap[item.icon];

          return (
            <Reveal key={item.title} delay={i * 100} className="h-full">
              <GlassCard className="flex h-full items-start gap-4 p-5 sm:gap-5 sm:p-6">
                <IconCircle
                  size="lg"
                  className="bg-[rgba(99,102,241,0.12)] text-[#818CF8]"
                >
                  {Icon && <Icon className="h-6 w-6" />}
                </IconCircle>
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[0.875rem] leading-[1.65] text-[#8B9DB8]">
                    {item.description}
                  </p>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
