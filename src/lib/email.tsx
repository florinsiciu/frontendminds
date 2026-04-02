import "server-only";

import { Resend } from "resend";
import type { DimensionPercentages, TierId } from "@/types/assessment";
import { TIER_MAP, getDimensionLabel, getDimensionTier } from "@/lib/config/scoring";
import { DIMENSION_MAP } from "@/lib/data/questions";
import { DIMENSION_ORDER } from "@/lib/config/scoring";
import { dimensionRecommendations } from "@/lib/content/dimension-recommendations";
import { siteConfig } from "@/lib/config/site";
import {
  getEmailSubject,
  preheaderByTier,
  getGreeting,
  sectionHeaders,
  emailCta,
  emailFooter,
} from "@/lib/content/email";
import { diagnosisTemplates } from "@/lib/content/results";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Heading,
} from "@react-email/components";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResultsEmailParams {
  to: string;
  firstName: string;
  totalPercentage: number;
  dimensionPercentages: DimensionPercentages;
  tier: TierId;
  resultId: string;
}

function ResultsEmail({
  firstName,
  totalPercentage,
  dimensionPercentages,
  tier,
  resultId,
}: Omit<SendResultsEmailParams, "to">) {
  const tierDef = TIER_MAP[tier];
  const resultsUrl = `${siteConfig.baseUrl}/assessment/results?id=${resultId}`;
  const calendlyUrl = siteConfig.calendly.buildUrl("email");

  return (
    <Html>
      <Head />
      <Preview>{preheaderByTier[tier]}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={h1Style}>
            {siteConfig.name}
          </Heading>

          <Text style={textStyle}>{getGreeting(firstName)}</Text>
          <Text style={textStyle}>
            Thank you for completing the Angular Modernization Assessment.
            Here&apos;s a summary of your results.
          </Text>

          <Hr style={hrStyle} />

          <Heading as="h2" style={h2Style}>
            {sectionHeaders.overallScore}
          </Heading>
          <Text style={scoreStyle}>
            {totalPercentage}% — {tierDef.label}
          </Text>
          <Text style={textStyle}>{tierDef.shortDiagnosis}</Text>

          <Hr style={hrStyle} />

          <Heading as="h2" style={h2Style}>
            {sectionHeaders.dimensionBreakdown}
          </Heading>

          {DIMENSION_ORDER.map((dimId) => {
            const pct = dimensionPercentages[dimId];
            const dim = DIMENSION_MAP[dimId];
            const label = getDimensionLabel(pct);
            const filled = Math.round(pct / 10);
            const bar = "█".repeat(filled) + "░".repeat(10 - filled);

            return (
              <Text key={dimId} style={dimensionStyle}>
                <strong>{dim.label}</strong>
                <br />
                {bar} {pct}% — {label}
              </Text>
            );
          })}

          <Hr style={hrStyle} />

          <Heading as="h2" style={h2Style}>
            {sectionHeaders.recommendations}
          </Heading>

          {DIMENSION_ORDER.map((dimId) => {
            const pct = dimensionPercentages[dimId];
            const dimTier = getDimensionTier(pct);
            const dim = DIMENSION_MAP[dimId];
            const rec = dimensionRecommendations[dimId][dimTier];

            return (
              <Text key={dimId} style={recStyle}>
                <strong>{dim.label}:</strong> {rec.headline}
              </Text>
            );
          })}

          <Hr style={hrStyle} />

          <Heading as="h2" style={h2Style}>
            {sectionHeaders.diagnosis}
          </Heading>
          <Text style={textStyle}>{diagnosisTemplates[tier]}</Text>

          <Hr style={hrStyle} />

          <Heading as="h2" style={h2Style}>
            {sectionHeaders.nextSteps}
          </Heading>

          <Section style={ctaSectionStyle}>
            <Button style={primaryButtonStyle} href={resultsUrl}>
              {emailCta.primaryLabel}
            </Button>
          </Section>

          <Section style={ctaSectionStyle}>
            <Button style={secondaryButtonStyle} href={`${siteConfig.baseUrl}/api/assessment/report/${resultId}`}>
              {emailCta.pdfLabel}
            </Button>
          </Section>

          <Section style={ctaSectionStyle}>
            <Button style={secondaryButtonStyle} href={calendlyUrl}>
              {emailCta.secondaryLabel}
            </Button>
          </Section>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>{emailFooter.companyName}</Text>
          <Text style={footerStyle}>{emailFooter.unsubscribe}</Text>
        </Container>
      </Body>
    </Html>
  );
}

export async function sendResultsEmail(
  params: SendResultsEmailParams,
): Promise<{ id: string } | null> {
  const { to, ...emailProps } = params;
  const tierDef = TIER_MAP[params.tier];

  const { data, error } = await resend.emails.send({
    from: `${siteConfig.shortName} <contact@frontendminds.com>`,
    to,
    subject: getEmailSubject(tierDef.label),
    react: React.createElement(ResultsEmail, emailProps),
  });

  if (error) {
    console.error("Failed to send results email:", error);
    return null;
  }

  return data;
}

// ─── Email Styles ──────────────────────────────────────────────────────────

const bodyStyle: React.CSSProperties = {
  backgroundColor: "#0F172A",
  fontFamily:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: 0,
  padding: 0,
};

const containerStyle: React.CSSProperties = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 24px",
};

const h1Style: React.CSSProperties = {
  color: "#F1F5F9",
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "32px",
};

const h2Style: React.CSSProperties = {
  color: "#F1F5F9",
  fontSize: "18px",
  fontWeight: 600,
  marginBottom: "12px",
};

const textStyle: React.CSSProperties = {
  color: "#A8B7CC",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const scoreStyle: React.CSSProperties = {
  color: "#F1F5F9",
  fontSize: "20px",
  fontWeight: 700,
  marginBottom: "8px",
};

const recStyle: React.CSSProperties = {
  color: "#A8B7CC",
  fontSize: "14px",
  lineHeight: "22px",
  marginBottom: "8px",
};

const dimensionStyle: React.CSSProperties = {
  color: "#A8B7CC",
  fontSize: "14px",
  lineHeight: "22px",
  marginBottom: "12px",
  fontFamily: "monospace",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#253349",
  margin: "24px 0",
};

const ctaSectionStyle: React.CSSProperties = {
  textAlign: "center" as const,
  marginBottom: "12px",
};

const primaryButtonStyle: React.CSSProperties = {
  backgroundColor: "#6366F1",
  color: "#FFFFFF",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
};

const secondaryButtonStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  color: "#93C5FD",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: 600,
  textDecoration: "none",
  display: "inline-block",
  border: "1px solid #253349",
};

const footerStyle: React.CSSProperties = {
  color: "#7A8CA3",
  fontSize: "12px",
  lineHeight: "18px",
  marginBottom: "4px",
};
