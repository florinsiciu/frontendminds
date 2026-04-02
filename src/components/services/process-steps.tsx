import { processSteps } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ProcessSteps() {
  return (
    <Section bg="muted">
      <div className="text-center">
        <Reveal>
          <Tagline>{processSteps.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-8 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:mb-10 sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
            {processSteps.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.steps.map((step, i) => (
          <Reveal key={step.number} delay={(i + 1) * 100}>
            <GlassCard className="h-full p-6 text-center">
              {/* Numbered circle */}
              <div
                className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold"
                style={{
                  backgroundColor: `${step.color}1A`,
                  color: step.color,
                }}
              >
                {step.number}
              </div>
              <h3 className="mb-2 text-[0.95rem] font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-[0.85rem] leading-[1.6] text-[#94A3B8]">
                {step.description}
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
