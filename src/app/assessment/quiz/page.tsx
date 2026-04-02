"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posthog } from "@/lib/posthog";
import { EVENTS } from "@/lib/config/analytics";
import { ProgressBar } from "@/components/quiz/progress-bar";
import { QuestionCard } from "@/components/quiz/question-card";
import { QualifyingCard } from "@/components/quiz/qualifying-card";
import {
  SCORED_QUESTIONS,
  QUALIFYING_QUESTIONS,
  TOTAL_SCORED_QUESTIONS,
} from "@/lib/data/questions";

const TOTAL_QUESTIONS = TOTAL_SCORED_QUESTIONS + QUALIFYING_QUESTIONS.length; // 22

export default function Quiz() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [scoredAnswers, setScoredAnswers] = useState<Record<string, boolean>>(
    {}
  );
  const [qualifyingAnswers, setQualifyingAnswers] = useState<
    Record<string, string>
  >({});
  const startTimeRef = useRef(Date.now());
  const currentIndexRef = useRef(0);
  currentIndexRef.current = currentIndex;
  const scoredAnswersRef = useRef(scoredAnswers);
  scoredAnswersRef.current = scoredAnswers;
  const qualifyingAnswersRef = useRef(qualifyingAnswers);
  qualifyingAnswersRef.current = qualifyingAnswers;

  // Track assessment_started on mount + quiz_abandoned on unload
  useEffect(() => {
    posthog.capture(EVENTS.ASSESSMENT_STARTED, { source: "quiz_page" });

    const handleBeforeUnload = () => {
      const idx = currentIndexRef.current;
      if (idx < TOTAL_SCORED_QUESTIONS) {
        const question = SCORED_QUESTIONS[idx];
        posthog.capture(EVENTS.QUIZ_ABANDONED, {
          last_question: question.id,
          dimension: question.dimensionId,
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const isQualifying = currentIndex >= TOTAL_SCORED_QUESTIONS;
  const qualifyingIndex = currentIndex - TOTAL_SCORED_QUESTIONS;

  const goNext = useCallback(() => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setDirection("forward");
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Track quiz_completed
      posthog.capture(EVENTS.QUIZ_COMPLETED, {
        total_time: Math.round((Date.now() - startTimeRef.current) / 1000),
      });

      // Quiz complete — persist answers for the email gate
      // Read from refs to avoid stale closure when called via setTimeout
      sessionStorage.setItem(
        "quizAnswers",
        JSON.stringify({
          scoredAnswers: scoredAnswersRef.current,
          qualifyingAnswers: qualifyingAnswersRef.current,
        })
      );
      router.push("/assessment/unlock");
    }
  }, [currentIndex, router]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("backward");
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleScoredAnswer = useCallback(
    (answer: boolean) => {
      const question = SCORED_QUESTIONS[currentIndex];
      setScoredAnswers((prev) => ({ ...prev, [question.id]: answer }));

      // Track question_answered
      posthog.capture(EVENTS.QUESTION_ANSWERED, {
        dimension: question.dimensionId,
        question_id: question.id,
        answer,
      });

      // Auto-advance after a short delay so user sees the selection
      setTimeout(goNext, 250);
    },
    [currentIndex, goNext]
  );

  const handleQualifyingAnswer = useCallback(
    (value: string) => {
      const question = QUALIFYING_QUESTIONS[qualifyingIndex];
      const key = question.id === "q21" ? "role" : "planning";
      setQualifyingAnswers((prev) => ({ ...prev, [key]: value }));
      setTimeout(goNext, 250);
    },
    [qualifyingIndex, goNext]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="px-4 pt-6 lg:pt-8">
        <div className="mx-auto max-w-xl">
          <ProgressBar
            currentIndex={currentIndex}
            totalQuestions={TOTAL_QUESTIONS}
            isQualifying={isQualifying}
          />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          {!isQualifying ? (
            <div
              key={SCORED_QUESTIONS[currentIndex].id}
              className={
                direction === "forward"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }
            >
              <QuestionCard
                question={SCORED_QUESTIONS[currentIndex]}
                onAnswer={handleScoredAnswer}
                currentAnswer={
                  scoredAnswers[SCORED_QUESTIONS[currentIndex].id]
                }
                currentIndex={currentIndex}
                totalQuestions={TOTAL_QUESTIONS}
              />
            </div>
          ) : (
            <div
              key={QUALIFYING_QUESTIONS[qualifyingIndex].id}
              className={
                direction === "forward"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }
            >
              <QualifyingCard
                question={QUALIFYING_QUESTIONS[qualifyingIndex]}
                onAnswer={handleQualifyingAnswer}
                currentAnswer={
                  QUALIFYING_QUESTIONS[qualifyingIndex].id === "q21"
                    ? qualifyingAnswers.role
                    : qualifyingAnswers.planning
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="mx-auto max-w-xl">
          {currentIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex min-h-[48px] items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <ArrowLeft className="size-4" />
              Previous question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
