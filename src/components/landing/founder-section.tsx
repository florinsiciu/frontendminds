import Image from "next/image";
import Link from "next/link";
import { founderSection } from "@/lib/content/landing";
import { Section } from "@/components/ui/section";
import { Tagline } from "@/components/ui/tagline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function FounderSection() {
  return (
    <Section>
      <Reveal>
        <div className="mx-auto max-w-[860px]">
          <GlassCard className="flex flex-col items-center gap-8 p-6 text-center sm:flex-row sm:items-center sm:gap-10 sm:p-12 sm:text-left">
            <Image
              src="/florin-siciu-profile.jpeg"
              alt="Florin Siciu"
              width={120}
              height={120}
              className="h-[120px] w-[120px] shrink-0 rounded-full border-2 border-white/[0.06] object-cover"
            />

            <div>
              <Tagline className="mb-3">{founderSection.eyebrow}</Tagline>
              <h2 className="mb-1 font-heading text-[1.5rem] font-bold text-foreground">
                {founderSection.name}
              </h2>
              <p className="mb-4 text-[0.875rem] font-medium text-[#818CF8]">
                {founderSection.title}
              </p>
              <p className="mb-4 text-[0.9rem] leading-[1.65] text-[#8B9DB8]">
                {founderSection.description}
              </p>

              <div className="flex items-center justify-center gap-6 sm:justify-start">
                <Link
                  href={founderSection.ctaHref}
                  className="inline-flex min-h-[44px] items-center text-[0.875rem] font-semibold text-[#818CF8] transition-colors hover:text-indigo-300"
                >
                  {founderSection.ctaText}
                </Link>
                <div className="flex gap-1">
                  <a
                    href="https://linkedin.com/in/florinsiciu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#64748B] transition-colors hover:text-slate-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="size-5" />
                  </a>
                  <a
                    href="https://github.com/florinsiciu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#64748B] transition-colors hover:text-slate-300"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="size-5" />
                  </a>
                  <a
                    href="https://x.com/nicusorsiciu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-[#64748B] transition-colors hover:text-slate-300"
                    aria-label="X"
                  >
                    <TwitterIcon className="size-5" />
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Reveal>
    </Section>
  );
}
