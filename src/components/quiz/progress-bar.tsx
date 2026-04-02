"use client";

import { DIMENSIONS } from "@/lib/data/questions";
import { TOTAL_SCORED_QUESTIONS } from "@/lib/data/questions";
import { DIMENSION_COLORS } from "@/lib/config/scoring";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  isQualifying: boolean;
}

export function ProgressBar({
  currentIndex,
  totalQuestions,
  isQualifying,
}: ProgressBarProps) {
  const scoredProgress = Math.min(currentIndex, TOTAL_SCORED_QUESTIONS);
  const currentDimensionIndex = Math.min(
    Math.floor(scoredProgress / 4),
    DIMENSIONS.length - 1
  );
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span
          className="font-medium"
          style={
            !isQualifying
              ? { color: DIMENSION_COLORS[DIMENSIONS[currentDimensionIndex].id] }
              : undefined
          }
        >
          {isQualifying
            ? "Almost done"
            : DIMENSIONS[currentDimensionIndex].label}
        </span>
        <span className="text-muted-foreground">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: !isQualifying
              ? DIMENSION_COLORS[DIMENSIONS[currentDimensionIndex].id]
              : undefined,
          }}
        />
      </div>
      {!isQualifying && (
        <div className="mt-2 hidden gap-1 sm:flex">
          {DIMENSIONS.map((dim, i) => {
            const color = DIMENSION_COLORS[dim.id];
            const isCompleted = i < currentDimensionIndex;
            const isActive = i === currentDimensionIndex;
            return (
              <div
                key={dim.id}
                className="h-1 flex-1 rounded-full transition-colors"
                style={{
                  backgroundColor: color,
                  opacity: isCompleted || isActive ? 1 : 0.12,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
