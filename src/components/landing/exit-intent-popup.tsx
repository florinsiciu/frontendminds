"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { subscribe, type SubscribeInput } from "@/actions/subscribe";
import { exitPopup } from "@/lib/content/landing";
import { posthog } from "@/lib/posthog";
import { EVENTS } from "@/lib/config/analytics";

const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MOBILE_TIMEOUT_MS = 45_000; // 45 seconds

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasTriggered = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    document.body.style.overflow = "";
    try {
      localStorage.setItem("fm_exit_popup_dismissed", Date.now().toString());
    } catch {}
  }, []);

  const showPopup = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsVisible(true);
    document.body.style.overflow = "hidden";
    posthog.capture(EVENTS.EXIT_POPUP_SHOWN);
  }, []);

  useEffect(() => {
    // Check skip conditions
    try {
      if (localStorage.getItem("fm_subscribed") === "true") return;

      const dismissed = localStorage.getItem("fm_exit_popup_dismissed");
      if (dismissed && Date.now() - Number(dismissed) < COOLDOWN_MS) return;

      // Future: skip if user already completed the scorecard
      // if (sessionStorage.getItem("fm_scorecard_completed") === "true") return;
    } catch {
      return;
    }

    // Desktop: mouse leaves viewport from top
    function handleMouseOut(e: MouseEvent) {
      if (e.clientY < 10) showPopup();
    }
    document.addEventListener("mouseout", handleMouseOut);

    // Mobile: 45s inactivity
    let mobileTimer = setTimeout(showPopup, MOBILE_TIMEOUT_MS);
    function resetMobileTimer() {
      clearTimeout(mobileTimer);
      mobileTimer = setTimeout(showPopup, MOBILE_TIMEOUT_MS);
    }
    window.addEventListener("scroll", resetMobileTimer, { passive: true });
    window.addEventListener("touchstart", resetMobileTimer, { passive: true });

    return () => {
      document.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(mobileTimer);
      window.removeEventListener("scroll", resetMobileTimer);
      window.removeEventListener("touchstart", resetMobileTimer);
    };
  }, [showPopup]);

  // Escape key
  useEffect(() => {
    if (!isVisible) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, dismiss]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const input: SubscribeInput = {
      firstName: formData.get("firstName") as string,
      email: formData.get("email") as string,
    };

    const result = await subscribe(input);

    if (result.success) {
      setStatus("success");
      posthog.capture(EVENTS.EXIT_POPUP_CONVERTED, { source: "exit_popup" });
      try {
        localStorage.setItem("fm_subscribed", "true");
      } catch {}
      setTimeout(dismiss, 2000);
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  function handleOverlayClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      dismiss();
    }
  }

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-popup-heading"
        className="relative mx-4 max-w-sm rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background/50 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close popup"
        >
          ✕
        </button>

        <div className="text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
            {exitPopup.eyebrow}
          </p>
          <h3 id="exit-popup-heading" className="mb-2 font-heading text-xl font-bold text-foreground">
            {exitPopup.headline}
          </h3>
          <p className="mb-5 text-sm text-muted-foreground">
            {exitPopup.description}
          </p>

          {status === "success" ? (
            <p className="text-sm font-medium text-secondary-foreground">
              Check your inbox!
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3"
              >
                <input
                  name="firstName"
                  type="text"
                  required
                  aria-label="First name"
                  placeholder="First name"
                  className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  name="email"
                  type="email"
                  required
                  aria-label="Email address"
                  placeholder="your@email.com"
                  className="rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-[0_4px_14px_rgba(99,102,241,0.25)] transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {status === "submitting" ? "Sending…" : exitPopup.ctaText}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
              )}
            </>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            <Link
              href={exitPopup.alternativeHref}
              onClick={dismiss}
              className="text-primary underline transition-colors hover:text-accent"
            >
              {exitPopup.alternativeText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
