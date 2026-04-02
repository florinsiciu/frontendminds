import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { Navigation } from "@/components/landing/navigation";
import { Footer } from "@/components/landing/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { defaultSeo, organizationJsonLd, websiteJsonLd } from "@/lib/content/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://frontendminds.com"),
  title: defaultSeo.title,
  description: defaultSeo.description,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: defaultSeo.title,
    description: defaultSeo.description,
    url: "https://frontendminds.com",
    siteName: "FrontendMinds",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSeo.title,
    description: defaultSeo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} dark h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <PostHogProvider>
          <Navigation />
          <div className="flex-1 pb-16 pt-14 lg:pb-0">{children}</div>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  );
}
