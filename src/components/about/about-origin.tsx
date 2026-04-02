import { aboutOrigin } from "@/lib/content/about";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { Reveal } from "@/components/ui/reveal";

export function AboutOrigin() {
  return (
    <Section bg="muted" width="narrow">
      <Reveal>
        <Tagline>{aboutOrigin.tagline}</Tagline>
        <h2 className="mb-8 font-heading text-[2rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2.5rem]">
          {aboutOrigin.headline}
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="space-y-6">
          {aboutOrigin.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className="text-[1.125rem] leading-[1.7] text-[#94A3B8]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
