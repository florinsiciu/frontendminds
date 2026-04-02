// ─── Form Validation Messages ───────────────────────────────────────────────

export const validation = {
  firstNameRequired: "First name is required",
  firstNameTooShort: "First name must be at least 2 characters",
  emailRequired: "Email is required",
  emailInvalid: "Please enter a valid email address",
  quizIncomplete: "Please answer all questions before continuing",
  qualifyingRequired: "Please select an option",
} as const;

// ─── 404 Page ───────────────────────────────────────────────────────────────

export const notFound = {
  heading: "Page Not Found",
  body: "The page you're looking for doesn't exist or has been moved.",
  ctaText: "Go to Homepage",
  ctaHref: "/",
} as const;

// ─── Invalid Results ────────────────────────────────────────────────────────

export const invalidResults = {
  heading: "Results Not Found",
  body: "We couldn't find these assessment results. The link may have expired or is invalid.",
  ctaText: "Take the Assessment",
  ctaHref: "/assessment",
} as const;

// ─── Generic Error ──────────────────────────────────────────────────────────

export const genericError = {
  heading: "Something Went Wrong",
  body: "An unexpected error occurred. Please try again.",
  ctaText: "Go to Homepage",
  ctaHref: "/",
} as const;

// ─── Server Action Errors ───────────────────────────────────────────────────

export const serverErrors = {
  submitFailed:
    "We couldn't submit your assessment. Please try again.",
  emailFailed:
    "Your results were saved, but we couldn't send the confirmation email. You can still view your results.",
} as const;
