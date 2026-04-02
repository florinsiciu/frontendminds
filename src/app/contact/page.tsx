"use client";

import { useState } from "react";
import { submitContact, type ContactInput } from "@/actions/contact";
import { contactPage } from "@/lib/content/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const input: ContactInput = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      reason: formData.get("reason") as ContactInput["reason"],
      message: formData.get("message") as string,
    };

    const result = await submitContact(input);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="mb-3 font-heading text-4xl font-bold text-foreground">
          {contactPage.heading}
        </h1>
        <p className="text-lg text-muted-foreground">{contactPage.subheading}</p>
      </div>

      {/* Success state */}
      {status === "success" ? (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-8 text-center">
          <p className="text-base font-medium text-foreground">
            {contactPage.successMessage}
          </p>
        </div>
      ) : (
        /* Contact form */
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-border bg-card p-8"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {contactPage.fields.name.label}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder={contactPage.fields.name.placeholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {contactPage.fields.email.label}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder={contactPage.fields.email.placeholder}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Reason */}
          <div>
            <label
              htmlFor="reason"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {contactPage.fields.reason.label}
            </label>
            <select
              id="reason"
              name="reason"
              required
              defaultValue=""
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="" disabled>
                Select a reason...
              </option>
              {contactPage.reasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              {contactPage.fields.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={contactPage.fields.message.placeholder}
              className="w-full resize-y rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Error message */}
          {status === "error" && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {status === "submitting"
              ? contactPage.submittingText
              : contactPage.submitText}
          </button>
        </form>
      )}
    </div>
  );
}
