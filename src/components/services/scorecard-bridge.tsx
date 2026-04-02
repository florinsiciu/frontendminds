import Link from "next/link";
import { scorecardBridge } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

export function ScorecardBridge() {
  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>{scorecardBridge.tagline}</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-3 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
            {scorecardBridge.headline}
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mb-8 max-w-[580px] text-[1.05rem] leading-[1.7] text-[#94A3B8] sm:mb-10">
            {scorecardBridge.subtitle}
          </p>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <GlassCard
          variant="highlight"
          className="mx-auto max-w-2xl p-5 sm:p-8 lg:p-10"
        >
          {/* Stats row */}
          <div className="mb-6 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-x-8">
            {scorecardBridge.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span
                  className={`text-[1.5rem] font-bold ${
                    "accent" in stat && stat.accent === "emerald"
                      ? "text-emerald-400"
                      : "bg-gradient-to-b from-indigo-300 to-indigo-500 bg-clip-text text-transparent"
                  }`}
                >
                  {stat.value}
                </span>
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.15em] text-[#7A8CA3]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dimension pills */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {scorecardBridge.dimensions.map((dim) => (
              <span
                key={dim.label}
                className="rounded-full px-3 py-1 text-[0.7rem] font-medium"
                style={{
                  backgroundColor: `${dim.color}0F`,
                  border: `1px solid ${dim.color}1F`,
                  color: dim.color,
                }}
              >
                {dim.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href={scorecardBridge.cta.href}
              className={cn(buttonVariants({ shape: "pill" }), "h-auto px-[2.75rem] py-[1.1rem] text-base font-semibold")}
            >
              {scorecardBridge.cta.text}
            </Link>
            <p className="mt-3 text-[0.75rem] text-[#7A8CA3]">
              {scorecardBridge.trustSignal}
            </p>
          </div>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
