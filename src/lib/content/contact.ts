// ─── Contact Page Content ────────────────────────────────────────────────────

export const contactPage = {
  heading: "Get in Touch",
  subheading:
    "Whether you have a question about a service, want to explore a partnership, or just want to say hello — I read every message.",

  reasons: [
    { value: "general", label: "General inquiry" },
    { value: "service", label: "Service enquiry (audit or consulting)" },
    { value: "speaking", label: "Speaking or workshop" },
    { value: "partnership", label: "Partnership or collaboration" },
  ] as const,

  fields: {
    name: { label: "Your name", placeholder: "Jane Smith" },
    email: { label: "Email address", placeholder: "jane@company.com" },
    reason: { label: "What's this about?" },
    message: {
      label: "Message",
      placeholder: "Tell me a bit about your situation and what you're hoping for...",
    },
  },

  submitText: "Send Message",
  submittingText: "Sending...",

  successMessage:
    "Message received! I'll get back to you within 1–2 business days.",
};
