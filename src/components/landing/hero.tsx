import Link from "next/link";
import { hero } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

const dimensions = [
  { label: "Migration", color: "#93C5FD" },
  { label: "Architecture", color: "#5EEAD4" },
  { label: "Modern", color: "#FBBF24" },
  { label: "AI Ready", color: "#C4B5FD" },
  { label: "Delivery", color: "#F87171" },
] as const;

export function Hero() {
  return (
    <section className="bg-dot-grid relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 md:pb-24 md:pt-40">
      {/* Indigo glow — 700px, 15% opacity, offset top-right */}
      <div className="pointer-events-none absolute -right-[200px] -top-[250px] h-[700px] w-[700px] rounded-full bg-indigo-500/[0.15] blur-[120px]" />
      {/* Emerald glow — 400px, 6% opacity, offset bottom-left */}
      <div className="pointer-events-none absolute -bottom-[100px] -left-[100px] h-[400px] w-[400px] rounded-full bg-emerald-500/[0.06] blur-[120px]" />

      <div className="relative z-[1] mx-auto max-w-[1200px] text-center">
        <Reveal>
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-[1.1rem] py-[0.35rem] text-[0.7rem] text-[#A5B4FC]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-[0.04em]">
              {hero.pillBadge}
            </span>
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mb-6 font-heading text-[1.875rem] font-bold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            How Modern Is Your
            <br className="hidden sm:inline" />
            <em className="text-indigo-400">Angular</em> App?
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mb-10 max-w-[580px] text-base leading-[1.7] text-muted-foreground sm:text-[1.15rem]">
            {hero.subheadline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants({ shape: "pill" }),
                "h-auto w-full py-[1.1rem] text-base font-semibold sm:w-auto sm:px-[2.75rem]"
              )}
            >
              {hero.primaryCta.text}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex w-full items-center justify-center rounded-full border border-[#334155] bg-transparent px-[2.25rem] py-[1.1rem] text-base font-semibold text-[#CBD5E1] transition-all md:hover:-translate-y-0.5 hover:border-[#475569] hover:text-foreground sm:w-auto"
            >
              {hero.secondaryCta.text}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <p className="mb-12 text-[0.8rem] text-[#64748B]">{hero.socialProof}</p>
        </Reveal>

        <Reveal delay={400}>
          <div>
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-[#64748B]">
              {hero.dimensionLabel}
            </p>
            <div className="flex flex-wrap justify-center gap-[0.625rem]">
              {dimensions.map((dim) => (
                <div
                  key={dim.label}
                  className="rounded-full px-4 py-[0.35rem] text-[0.78rem] font-medium"
                  style={{
                    backgroundColor: `${dim.color}0F`,
                    borderWidth: 1,
                    borderColor: `${dim.color}1F`,
                    color: dim.color,
                  }}
                >
                  {dim.label}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
