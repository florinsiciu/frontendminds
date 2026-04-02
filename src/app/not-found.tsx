import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import { notFound } from "@/lib/content/errors";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="text-center">
        <p className="text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          {notFound.heading}
        </h1>
        <p className="mt-2 text-muted-foreground">{notFound.body}</p>
        <div className="mt-8">
          <Link
            href={notFound.ctaHref}
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8")}
          >
            {notFound.ctaText}
          </Link>
        </div>
      </div>
    </main>
  );
}
