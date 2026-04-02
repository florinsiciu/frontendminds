"use client";

import { useState } from "react";
import Link from "next/link";
import { subscribe, type SubscribeInput } from "@/actions/subscribe";
import { newsletterFormDefaults } from "@/lib/content/newsletter";

interface NewsletterFormProps {
  variant?: "compact" | "full";
  onSuccess?: () => void;
  className?: string;
}

export function NewsletterForm({
  variant = "full",
  onSuccess,
  className,
}: NewsletterFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const input: SubscribeInput = {
      email: formData.get("email") as string,
      ...(variant === "full" && {
        firstName: formData.get("firstName") as string,
      }),
    };

    const result = await subscribe(input);

    if (result.success) {
      setStatus("success");
      onSuccess?.();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className={className}>
        <p className="text-[0.9rem] font-medium text-foreground">
          {newsletterFormDefaults.successMessage}
        </p>
        <Link
          href={newsletterFormDefaults.crossSell.href}
          className="mt-3 inline-block text-[0.85rem] font-medium text-primary underline underline-offset-4 hover:text-accent"
        >
          {newsletterFormDefaults.crossSell.text}
        </Link>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={className}>
        <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            name="email"
            type="email"
            required
            placeholder={newsletterFormDefaults.placeholder.email}
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-[0.85rem] text-[0.9rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:flex-1"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-primary px-[2.25rem] py-[0.85rem] text-[0.9375rem] font-semibold text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)] disabled:opacity-50 sm:w-auto"
          >
            {status === "submitting"
              ? newsletterFormDefaults.submittingText
              : "Subscribe Free"}
          </button>
        </div>
        {status === "error" && (
          <p className="mt-2 text-center text-[0.8rem] text-destructive">
            {errorMessage}
          </p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-3.5">
        <div>
          <label
            htmlFor="nl-firstName"
            className="mb-2 block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#8B9DB8]"
          >
            First name
          </label>
          <input
            id="nl-firstName"
            name="firstName"
            type="text"
            required
            placeholder="Alex"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-[0.85rem] text-[0.9rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="mt-1">
          <label
            htmlFor="nl-email"
            className="mb-2 block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-[#8B9DB8]"
          >
            Email
          </label>
          <input
            id="nl-email"
            name="email"
            type="email"
            required
            placeholder="alex@email.com"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-[0.85rem] text-[0.9rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-1 w-full rounded-full bg-primary px-[2.25rem] py-4 text-[0.9375rem] font-semibold text-white shadow-[0_4px_24px_rgba(99,102,241,0.35)] transition-all md:hover:-translate-y-0.5 md:hover:shadow-[0_0_0_4px_rgba(99,102,241,0.15),0_6px_28px_rgba(99,102,241,0.45)] disabled:opacity-50"
        >
          {status === "submitting"
            ? newsletterFormDefaults.submittingText
            : newsletterFormDefaults.submitText}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-[0.8rem] text-destructive">{errorMessage}</p>
      )}
    </form>
  );
}
