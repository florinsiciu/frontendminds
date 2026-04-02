import { Search, Bot, Puzzle, CheckCircle } from "lucide-react";
import type { Service } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { IconCircle } from "@/components/ui/icon-circle";
import { Reveal } from "@/components/ui/reveal";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Bot,
  Puzzle,
};

interface ServiceDeepDiveProps {
  service: Service;
  reversed?: boolean;
  bg?: "default" | "muted";
}

export function ServiceDeepDive({
  service,
  reversed = false,
  bg = "default",
}: ServiceDeepDiveProps) {
  const Icon = iconMap[service.icon];

  const textColumn = (
    <div className="order-1 flex flex-1 flex-col justify-center lg:order-none">
      <Reveal>
        <div className="mb-4 flex items-center gap-3">
          <IconCircle>
            {Icon && <Icon className="h-5 w-5" />}
          </IconCircle>
          <Tagline className="mb-0">{service.label}</Tagline>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <h2
          id={service.id}
          className="mb-3 scroll-mt-24 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground lg:text-4xl"
        >
          {service.title}
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <p className="mb-4 text-[0.9rem] italic leading-[1.6] text-[#8B9DB8]">
          {service.problem}
        </p>
      </Reveal>

      <Reveal delay={300}>
        <p className="text-[0.9rem] leading-[1.65] text-foreground/80">
          {service.description}
        </p>
      </Reveal>
    </div>
  );

  const cardColumn = (
    <div className="order-2 flex flex-1 lg:items-start lg:order-none">
      <Reveal delay={200} className="w-full">
        <GlassCard className="w-full p-6 lg:p-8">
          <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#7A8CA3]">
            What you get
          </p>
          <ul className="space-y-3">
            {service.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span className="text-[0.85rem] leading-[1.5] text-foreground/80">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </Reveal>
    </div>
  );

  return (
    <Section bg={bg} aria-labelledby={service.id}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 xl:gap-16">
        {reversed ? (
          <>
            {cardColumn}
            {textColumn}
          </>
        ) : (
          <>
            {textColumn}
            {cardColumn}
          </>
        )}
      </div>
    </Section>
  );
}
