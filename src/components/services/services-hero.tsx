import Link from "next/link";
import { servicesHero } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function ServicesHero() {
  return (
    <Section className="relative overflow-hidden">
      {/* Dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 bg-dot-grid opacity-60"
        aria-hidden="true"
      />
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-indigo-500/[0.15] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative text-center">
        <Reveal>
          <Tagline>{servicesHero.tagline}</Tagline>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mx-auto mb-5 max-w-[720px] font-heading text-[1.875rem] font-bold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2.5rem] lg:text-[3.5rem]">
            {servicesHero.headline}
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mb-8 max-w-[580px] text-base leading-[1.7] text-[#94A3B8] sm:text-[1.15rem]">
            {servicesHero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <Link
            href={servicesHero.primaryCta.href}
            className={cn(buttonVariants({ shape: "pill" }), "h-auto w-full py-[1.1rem] text-base font-semibold sm:w-auto sm:px-[2.75rem]")}
          >
            {servicesHero.primaryCta.text}
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}
