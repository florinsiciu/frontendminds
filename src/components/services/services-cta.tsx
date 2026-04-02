import Link from "next/link";
import { servicesCta } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function ServicesCta() {
  return (
    <Section bg="muted">
      <Reveal>
        <GlassCard
          variant="highlight"
          className="relative mx-auto max-w-2xl overflow-hidden px-6 py-8 text-center sm:p-8 lg:p-12"
        >
          {/* Subtle glow */}
          <div
            className="pointer-events-none absolute -top-[80px] left-1/2 h-[160px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500/[0.12] blur-[80px]"
            aria-hidden="true"
          />

          <div className="relative">
            <Tagline className="mx-auto">{servicesCta.tagline}</Tagline>

            <h2 className="mb-3 font-heading text-[1.375rem] font-bold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-2xl md:text-3xl">
              {servicesCta.headline}
            </h2>

            <p className="mx-auto mb-6 max-w-[440px] text-[0.95rem] leading-[1.65] text-[#94A3B8] sm:mb-8">
              {servicesCta.subtitle}
            </p>

            <div className="flex flex-col items-center justify-center gap-3">
              <Link
                href={servicesCta.primaryCta.href}
                className={cn(buttonVariants({ shape: "pill" }), "h-auto w-full py-[1.1rem] text-base font-semibold lg:w-auto lg:px-[2.75rem]")}
              >
                {servicesCta.primaryCta.text}
              </Link>
              <p className="text-sm text-subtle">{servicesCta.trustSignal}</p>
            </div>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
