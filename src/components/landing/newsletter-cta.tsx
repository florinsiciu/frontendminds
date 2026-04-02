import { newsletterCta } from "@/lib/content/landing";
import { NewsletterForm } from "@/components/newsletter-form";
import { Reveal } from "@/components/ui/reveal";

export function NewsletterCtaSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 sm:p-12 text-center">
          <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
            {newsletterCta.heading}
          </h2>
          <p className="mb-6 text-muted-foreground">{newsletterCta.subheading}</p>
          <NewsletterForm variant="full" className="mx-auto max-w-xl" />
        </div>
      </Reveal>
    </section>
  );
}
