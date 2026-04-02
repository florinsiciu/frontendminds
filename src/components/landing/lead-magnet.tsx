"use client";

import { newsletterCta } from "@/lib/content/landing";
import { NewsletterForm } from "@/components/newsletter-form";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Tagline } from "@/components/ui/tagline";

export function LeadMagnet() {
  function handleSuccess() {
    try {
      localStorage.setItem("fm_subscribed", "true");
    } catch {}
  }

  return (
    <Section bg="muted">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
        {/* Left column — copy & benefits */}
        <div className="flex-1">
          <Tagline>{newsletterCta.tagline}</Tagline>
          <h2 className="mb-3 font-heading text-[2rem] font-bold leading-[1.1] text-foreground">
            The Frontend<br />
            <em className="font-heading italic text-[#818CF8]">Signal</em>
          </h2>
          <p className="mb-6 text-[0.9rem] leading-[1.65] text-[#8B9DB8]">
            {newsletterCta.subheading}
          </p>
          <ul className="space-y-[0.6rem]">
            {newsletterCta.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <span className="shrink-0 text-[1rem] text-[#34D399]">✓</span>
                <span className="text-[0.9rem] leading-[1.65] text-[#8B9DB8]">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — form */}
        <div className="w-full flex-1">
          <GlassCard className="w-full p-8">
            <NewsletterForm variant="full" onSuccess={handleSuccess} />
            <p className="mt-3 text-center text-[0.75rem] text-[#7A8CA3]">
              {newsletterCta.finePrint}
            </p>
          </GlassCard>
        </div>
      </div>
    </Section>
  );
}
