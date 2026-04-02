import "server-only";

import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
  Hr,
  Heading,
} from "@react-email/components";
import * as React from "react";

interface NurtureEmailProps {
  firstName: string;
  heading: string;
  preheader: string;
  body: readonly string[];
  cta: { text: string; href: string } | null;
  closing: string;
}

export function NurtureEmail({
  firstName,
  heading,
  preheader,
  body,
  cta,
  closing,
}: NurtureEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{preheader}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading as="h1" style={h1Style}>
            FrontendMinds
          </Heading>

          <Heading as="h2" style={h2Style}>
            {heading}
          </Heading>

          <Text style={textStyle}>
            Hi{firstName ? ` ${firstName}` : ""},
          </Text>

          {body.map((paragraph, i) => (
            <Text key={i} style={paragraph.startsWith("•") || paragraph.startsWith("1.") ? listStyle : textStyle}>
              {paragraph}
            </Text>
          ))}

          {cta && (
            <div style={ctaSectionStyle}>
              <Button style={primaryButtonStyle} href={cta.href}>
                {cta.text}
              </Button>
            </div>
          )}

          <Hr style={hrStyle} />

          <Text style={textStyle}>{closing}</Text>

          <Hr style={hrStyle} />

          <Text style={footerStyle}>FrontendMinds</Text>
          <Text style={footerStyle}>
            You received this because you subscribed to The Frontend Signal.
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
  whiteSpace: "pre-line",
};

const listStyle: React.CSSProperties = {
  ...textStyle,
  paddingLeft: "8px",
};

const hrStyle: React.CSSProperties = {
  borderColor: "#253349",
  margin: "24px 0",
};

const ctaSectionStyle: React.CSSProperties = {
  textAlign: "center" as const,
  margin: "24px 0",
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

const footerStyle: React.CSSProperties = {
  color: "#7A8CA3",
  fontSize: "12px",
  lineHeight: "18px",
  marginBottom: "4px",
};
