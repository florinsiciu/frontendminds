"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqItems } from "@/lib/content/services";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section>
      <div className="text-center">
        <Reveal>
          <Tagline>Questions</Tagline>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-8 font-heading text-[1.75rem] font-bold leading-[1.1] tracking-[-0.02em] text-foreground sm:mb-10 sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]">
            Frequently Asked
          </h2>
        </Reveal>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-3 lg:max-w-4xl">
        {faqItems.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <Reveal key={item.question} delay={(i + 1) * 50}>
              <GlassCard className="overflow-hidden">
                <button
                  type="button"
                  id={`faq-question-${i}`}
                  className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 min-h-[56px] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="pr-4 text-[0.9rem] font-semibold text-foreground">
                    {item.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-indigo-400" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-indigo-400" />
                  )}
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-[1.65] text-[#94A3B8] sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
