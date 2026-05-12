import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.unlock.title,
  description: pageSeo.unlock.description,
  robots: { index: false, follow: false },
};

export default function UnlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
