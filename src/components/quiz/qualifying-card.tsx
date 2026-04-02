"use client";

import type { QualifyingQuestion } from "@/types/assessment";
import { GlassCard } from "@/components/ui/glass-card";

const QUALIFYING_COLOR = "#818CF8";

interface QualifyingCardProps {
  question: QualifyingQuestion;
  onAnswer: (value: string) => void;
  currentAnswer?: string;
}

export function QualifyingCard({
  question,
  onAnswer,
  currentAnswer,
}: QualifyingCardProps) {
  return (
    <GlassCard className="p-6 lg:p-8 hover:translate-y-0">
      <div className="flex flex-col items-center text-center">
        <span
          className="mb-2 inline-block rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${QUALIFYING_COLOR}14`,
            borderColor: `${QUALIFYING_COLOR}33`,
            color: QUALIFYING_COLOR,
          }}
        >
          About You
        </span>
        <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl lg:text-3xl">
          {question.text}
        </h2>
        <div className="mt-10 flex w-full flex-col gap-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(option.value)}
              className={`min-h-[48px] rounded-lg border px-6 py-3 text-left text-base font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                currentAnswer === option.value
                  ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                  : "border-border bg-white/[0.03] text-foreground hover:border-indigo-500/50 hover:bg-indigo-500/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
