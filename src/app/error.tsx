"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { genericError } from "@/lib/content/errors";

export default function Error({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="text-6xl font-bold text-accent">!</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {genericError.heading}
        </h1>
        <p className="mt-2 text-muted-foreground">{genericError.body}</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={unstable_retry}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 px-8"
            )}
          >
            Try Again
          </button>
          <a
            href={genericError.ctaHref}
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8")}
          >
            {genericError.ctaText}
          </a>
        </div>
      </div>
    </main>
  );
}
