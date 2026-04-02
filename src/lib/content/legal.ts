// ─── Privacy Policy ─────────────────────────────────────────────────────────

export const privacyPolicy = {
  title: "Privacy Policy",
  lastUpdated: "March 26, 2026",
  sections: [
    {
      heading: "Introduction",
      body: "FrontendMinds (\"we\", \"us\", \"our\"), operated by Florin Siciu, runs the FrontendMinds website. This Privacy Policy explains how we collect, use, and protect your personal information when you use our assessment tool and website.",
    },
    {
      heading: "Information We Collect",
      body: "We collect the following information when you complete the Angular Modernization Assessment:\n\n- **First name** — to personalize your results and communications\n- **Email address** — to deliver your assessment results and enable follow-up\n- **Assessment answers** — your responses to the 20 scored questions and 2 qualifying questions\n- **Assessment scores** — your calculated dimension scores, total score, and tier\n- **UTM parameters** — traffic source data from URL parameters (utm_source, utm_medium, utm_campaign)\n\nWe also automatically collect anonymous usage data through PostHog analytics, including page views, quiz progress, and interaction events.",
    },
    {
      heading: "How We Use Your Information",
      body: "We use your information to:\n\n- Calculate and display your personalized assessment results\n- Send you a one-time results email with your score breakdown\n- Enable you to view your results at any time via a unique results link\n- Understand aggregate assessment patterns to improve the tool\n- Follow up with relevant modernization resources if you've booked a call",
    },
    {
      heading: "Data Storage & Security",
      body: "Your data is stored securely in Supabase (hosted on AWS infrastructure). We use industry-standard encryption for data in transit (TLS/SSL) and at rest. Access to your data is limited to authorized personnel only.",
    },
    {
      heading: "Third-Party Services",
      body: "We use the following third-party services:\n\n- **Supabase** — database hosting and authentication\n- **Resend** — transactional email delivery\n- **PostHog** — privacy-friendly analytics\n- **Vercel** — website hosting\n- **Calendly** — appointment scheduling (when you choose to book a call)",
    },
    {
      heading: "Data Retention",
      body: "We retain your assessment data indefinitely to allow you to access your results and retake the assessment. You may request deletion of your data at any time by contacting us.",
    },
    {
      heading: "Your Rights",
      body: "You have the right to:\n\n- Access the personal data we hold about you\n- Request correction of inaccurate data\n- Request deletion of your data\n- Object to processing of your data\n- Request a copy of your data in a portable format\n\nTo exercise any of these rights, contact us at the email address below.",
    },
    {
      heading: "Cookies",
      body: "We use essential cookies for site functionality and analytics cookies through PostHog. PostHog is configured to respect Do Not Track browser settings. No advertising or third-party tracking cookies are used.",
    },
    {
      heading: "Contact",
      body: "For privacy-related inquiries, contact:\n\nFlorin Siciu\nEmail: contact@frontendminds.com",
    },
  ],
} as const;

// ─── Terms of Service ───────────────────────────────────────────────────────

export const termsOfService = {
  title: "Terms of Service",
  lastUpdated: "March 26, 2026",
  sections: [
    {
      heading: "Agreement to Terms",
      body: "By accessing and using the Angular Modernization Scorecard (the \"Service\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.",
    },
    {
      heading: "Description of Service",
      body: "The Angular Modernization Scorecard is a free online assessment tool that evaluates Angular projects across five modernization dimensions. The Service provides a personalized score, dimension breakdown, and recommendations based on your responses.",
    },
    {
      heading: "Assessment Results",
      body: "Assessment results are generated based on your self-reported answers and are intended as general guidance. They do not constitute professional advice, an audit, or a guarantee of any particular outcome. Results should be used as a starting point for discussion with qualified professionals.",
    },
    {
      heading: "User Responsibilities",
      body: "When using the Service, you agree to:\n\n- Provide accurate information in the assessment and email form\n- Use the Service for its intended purpose\n- Not attempt to manipulate, reverse-engineer, or abuse the scoring system\n- Not use automated tools to submit assessments",
    },
    {
      heading: "Intellectual Property",
      body: "All content, design, scoring methodology, and assessment questions are the intellectual property of FrontendMinds. You may not reproduce, distribute, or create derivative works from the Service without written permission.",
    },
    {
      heading: "Email Communications",
      body: "By submitting the email gate form, you consent to receive a one-time results email containing your assessment score. We will not add you to a mailing list or send unsolicited marketing emails without your explicit consent.",
    },
    {
      heading: "Limitation of Liability",
      body: "The Service is provided \"as is\" without warranties of any kind, express or implied. FrontendMinds shall not be liable for any damages arising from your use of the Service, including but not limited to decisions made based on assessment results.",
    },
    {
      heading: "Modifications",
      body: "We reserve the right to modify these terms, the assessment questions, scoring methodology, or any aspect of the Service at any time. Continued use of the Service after changes constitutes acceptance of the modified terms.",
    },
    {
      heading: "Governing Law",
      body: "These terms are governed by applicable law. Any disputes arising from the use of the Service shall be resolved through good-faith negotiation.",
    },
    {
      heading: "Contact",
      body: "For questions about these terms, contact:\n\nFlorin Siciu\nEmail: contact@frontendminds.com",
    },
  ],
} as const;
