import "server-only";

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
import type { TierId } from "@/types/assessment";
import { siteConfig } from "@/lib/config/site";
import { followUpDay3, followUpDay7 } from "@/lib/content/followup-emails";

interface FollowUpEmailProps {
  firstName: string;
  tier: TierId;
  resultId: string;
  dayIndex: 3 | 7;
}

export function FollowUpEmail({
  firstName,
  tier,
  resultId,
  dayIndex,
}: FollowUpEmailProps) {
  const content = dayIndex === 3 ? followUpDay3[tier] : followUpDay7[tier];
  const resultsUrl = `${siteConfig.baseUrl}/assessment/results?id=${resultId}`;
  const calendlyUrl = siteConfig.calendly.buildUrl("followup");

  return (
    <Html>
      <Head />
      <Preview>{content.preheader}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={h1Style}>
            FrontendMinds
          </Heading>

          <Text style={textStyle}>Hi {firstName},</Text>

          {content.body.map((paragraph, i) => (
            <Text key={i} style={textStyle}>
              {paragraph}
            </Text>
          ))}

          <Section style={ctaSectionStyle}>
            <Button style={primaryButtonStyle} href={calendlyUrl}>
              {content.ctaText}
            </Button>
          </Section>

          <Section style={ctaSectionStyle}>
            <Button style={secondaryButtonStyle} href={resultsUrl}>
              Review Your Scorecard Results
            </Button>
          </Section>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>FrontendMinds</Text>
          <Text style={footerStyle}>
            You received this because you completed the Angular Modernization
            Scorecard.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

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

const textStyle: React.CSSProperties = {
  color: "#A8B7CC",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "16px",
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
