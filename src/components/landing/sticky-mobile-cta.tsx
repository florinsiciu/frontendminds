"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { hero } from "@/lib/content/landing";

export function StickyMobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-sm lg:hidden">
      <div className="mx-auto max-w-md">
        <Link
          href={hero.primaryCta.href}
          className={cn(buttonVariants({ size: "lg" }), "h-12 w-full text-[0.9375rem] shadow-[0_0_20px_rgba(99,102,241,0.3)]")}
        >
        {hero.primaryCta.text}
        </Link>
      </div>
    </div>
  );
}
