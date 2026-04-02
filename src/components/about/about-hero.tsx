import Image from "next/image";
import { aboutHero } from "@/lib/content/about";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";

export function AboutHero() {
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

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        {/* Text column */}
        <div className="flex-1">
          <Reveal>
            <Tagline>{aboutHero.tagline}</Tagline>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mb-5 font-heading text-[1.875rem] font-bold leading-[1.15] tracking-[-0.02em] text-foreground md:text-[2.5rem] lg:text-[3.5rem]">
              {aboutHero.headline}
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-[580px] text-base leading-[1.7] text-[#94A3B8] sm:text-[1.15rem]">
              {aboutHero.positioning}
            </p>
          </Reveal>
        </div>

        {/* Photo column */}
        <Reveal delay={200}>
          <div className="shrink-0">
            <Image
              src="/florin-siciu-profile.jpeg"
              alt="Florin Siciu"
              width={280}
              height={280}
              className="h-[280px] w-[280px] rounded-2xl border-2 border-white/[0.06] object-cover"
              priority
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
