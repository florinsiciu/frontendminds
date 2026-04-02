import { statsBar } from "@/lib/content/landing";
import { Reveal } from "@/components/ui/reveal";

export function StatsBar() {
  const lastIndex = statsBar.stats.length - 1;

  return (
    <section className="bg-[#151F32]/50 border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {statsBar.stats.map((stat, i) => {
          const isLast = i === lastIndex;
          const needsTopBorder = i >= 2;

          return (
            <Reveal key={stat.label} delay={i * 100}>
              <div
                className={[
                  "py-8 px-4 text-center sm:py-10 sm:px-6",
                  isLast
                    ? ""
                    : "border-r border-white/[0.06]",
                  needsTopBorder
                    ? "border-t border-white/[0.06] md:border-t-0"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={`font-heading text-[2.5rem] font-bold leading-none tracking-[-0.02em] sm:text-[3.25rem] bg-gradient-to-br ${
                    "accent" in stat && stat.accent === "emerald"
                      ? "from-[#34D399] to-[#5EEAD4]"
                      : "from-indigo-400 to-indigo-500"
                  } bg-clip-text text-transparent mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
