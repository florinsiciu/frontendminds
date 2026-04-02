"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod/v3";
import { Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { posthog } from "@/lib/posthog";
import { EVENTS } from "@/lib/config/analytics";
import { emailGate } from "@/lib/content/assessment";
import { submitAssessment } from "@/actions/submit-assessment";
import { serverErrors } from "@/lib/content/errors";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";
import { ScoreTeaser } from "@/components/quiz/score-teaser";

const emailGateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type FieldErrors = { firstName?: string[]; email?: string[] };

export default function Unlock() {
  const router = useRouter();
  const redirected = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("quizAnswers") && !redirected.current) {
      redirected.current = true;
      router.replace("/assessment/quiz");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const raw = {
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
    };

    const result = emailGateSchema.safeParse(raw);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      return;
    }

    setPending(true);

    const quizAnswers = sessionStorage.getItem("quizAnswers");
    if (!quizAnswers) {
      router.replace("/assessment/quiz");
      return;
    }

    const { scoredAnswers, qualifyingAnswers } = JSON.parse(quizAnswers);

    const params = new URLSearchParams(window.location.search);

    const submitResult = await submitAssessment({
      firstName: result.data.firstName,
      email: result.data.email,
      scoredAnswers,
      qualifyingAnswers,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    });

    if (!submitResult.success) {
      setPending(false);
      setServerError(submitResult.error ?? serverErrors.submitFailed);
      return;
    }

    posthog.capture(EVENTS.EMAIL_SUBMITTED);
    sessionStorage.removeItem("quizAnswers");
    router.push(`/assessment/results?id=${submitResult.resultId}`);
  }

  return (
    <Section bg="muted" width="narrow">
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <div className="w-full max-w-md">
          {/* Heading area */}
          <div className="text-center mb-8">
            <Tagline>{emailGate.tagline}</Tagline>
            <h1 className="text-2xl font-heading font-bold text-foreground lg:text-3xl">
              Your Score Is{" "}
              <em className="not-italic font-heading text-indigo-400">Ready</em>
            </h1>
            <p className="mt-2 text-muted-foreground">{emailGate.subheading}</p>
          </div>

          {/* Score teaser */}
          <Reveal>
            <div className="mb-8">
              <ScoreTeaser />
            </div>
          </Reveal>

          {/* Server error */}
          {serverError && (
            <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          {/* Form */}
          <Reveal delay={100}>
            <GlassCard className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {emailGate.form.firstNameLabel}
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    placeholder={emailGate.form.firstNamePlaceholder}
                    className={cn(
                      "h-12 w-full rounded-lg border bg-card px-4 text-base text-foreground placeholder:text-subtle outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent",
                      fieldErrors.firstName ? "border-destructive" : "border-border"
                    )}
                  />
                  {fieldErrors.firstName && (
                    <p className="mt-1 text-sm text-destructive">
                      {fieldErrors.firstName[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    {emailGate.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={emailGate.form.emailPlaceholder}
                    className={cn(
                      "h-12 w-full rounded-lg border bg-card px-4 text-base text-foreground placeholder:text-subtle outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent",
                      fieldErrors.email ? "border-destructive" : "border-border"
                    )}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    buttonVariants({ size: "lg", shape: "pill" }),
                    "mt-2 h-12 w-full text-base"
                  )}
                >
                  {pending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {emailGate.form.submitText}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>

            <p className="text-center text-xs text-muted-foreground mt-3">
              🔒 {emailGate.trustLine}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
