import { CheckCircle, XCircle } from "lucide-react";
import { fitCheck } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function FitCheck() {
  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>{fitCheck.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-8 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:mb-10 sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
            {fitCheck.headline}
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        <Reveal delay={200}>
          <GlassCard className="h-full p-6 lg:p-8">
            <p className="mb-5 text-[0.9rem] font-semibold text-emerald-400">
              This is for you if&hellip;
            </p>
            <ul className="space-y-3">
              {fitCheck.goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald-400" />
                  <span className="text-[0.85rem] leading-[1.5] text-foreground/80 sm:text-[0.9rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <Reveal delay={300}>
          <GlassCard className="h-full p-6 lg:p-8">
            <p className="mb-5 text-[0.9rem] font-semibold text-red-400">
              This probably isn&apos;t for you if&hellip;
            </p>
            <ul className="space-y-3">
              {fitCheck.notFit.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-red-400" />
                  <span className="text-[0.85rem] leading-[1.5] text-foreground/80 sm:text-[0.9rem]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
