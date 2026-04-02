"use client";

import type { Question } from "@/types/assessment";
import { DIMENSION_MAP } from "@/lib/data/questions";
import { GlassCard } from "@/components/ui/glass-card";
import { DIMENSION_COLORS } from "@/lib/config/scoring";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: boolean) => void;
  currentAnswer?: boolean;
  currentIndex: number;
  totalQuestions: number;
}

export function QuestionCard({
  question,
  onAnswer,
  currentAnswer,
  currentIndex,
  totalQuestions,
}: QuestionCardProps) {
  const dimension = DIMENSION_MAP[question.dimensionId];
  const color = DIMENSION_COLORS[question.dimensionId];

  // Within-dimension progress: each dimension has 4 questions
  const dimStartIndex = Math.floor(currentIndex / 4) * 4;
  const withinDimIndex = currentIndex - dimStartIndex;

  return (
    <GlassCard className="p-6 lg:p-8 hover:translate-y-0">
      <div className="flex flex-col items-center text-center">
        <span
          className="mb-2 inline-block rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: `${color}14`,
            borderColor: `${color}33`,
            color,
          }}
        >
          {dimension.label}
        </span>
        <h2 className="text-xl font-bold leading-snug text-foreground sm:text-2xl lg:text-3xl">
          {question.text}
        </h2>
        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => onAnswer(true)}
            className={`min-h-[48px] flex-1 rounded-lg border px-8 py-3 text-base font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:max-w-[200px] ${
              currentAnswer === true
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                : "border-border bg-white/[0.03] text-foreground hover:border-indigo-500/50 hover:bg-indigo-500/10"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onAnswer(false)}
            className={`min-h-[48px] flex-1 rounded-lg border px-8 py-3 text-base font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:max-w-[200px] ${
              currentAnswer === false
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                : "border-border bg-white/[0.03] text-foreground hover:border-indigo-500/50 hover:bg-indigo-500/10"
            }`}
          >
            No
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </p>

        {/* Within-dimension dot indicators */}
        <div className="mt-3 flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="size-2 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i <= withinDimIndex ? color : `${color}30`,
              }}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
