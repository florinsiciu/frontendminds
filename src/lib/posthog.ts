import posthog from "posthog-js";

export function initPostHog() {
  if (
    typeof window === "undefined" ||
    !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_KEY.startsWith("phc_your")
  ) {
    return;
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export { posthog };
