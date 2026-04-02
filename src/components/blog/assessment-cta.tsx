import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  assessmentCtaInline,
  assessmentCtaEndOfArticle,
} from "@/lib/content/assessment-cta";

export function AssessmentCta({
  variant = "end-of-article",
}: {
  variant?: "inline" | "end-of-article";
}) {
  if (variant === "inline") {
    return (
      <div className="my-8 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4">
        <p className="text-[0.9rem] leading-relaxed text-foreground/80">
          {assessmentCtaInline.text}{" "}
          <Link
            href={assessmentCtaInline.href}
            className="font-medium text-primary underline underline-offset-4 hover:text-accent"
          >
            {assessmentCtaInline.linkText}
          </Link>
        </p>
      </div>
    );
  }

  return (
    <Section bg="accent" width="wide">
      <div className="mx-auto max-w-2xl text-center">
        <Tagline>{assessmentCtaEndOfArticle.tagline}</Tagline>
        <h2 className="mb-3 font-heading text-[1.75rem] font-bold leading-[1.15] text-foreground sm:text-[2rem]">
          {assessmentCtaEndOfArticle.heading}
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-[0.9rem] leading-[1.65] text-[#8B9DB8]">
          {assessmentCtaEndOfArticle.description}
        </p>
        <Link
          href={assessmentCtaEndOfArticle.href}
          className={buttonVariants({ shape: "pill", size: "lg" })}
        >
          {assessmentCtaEndOfArticle.ctaText}
        </Link>
      </div>
    </Section>
  );
}
