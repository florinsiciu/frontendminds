import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.contact.title,
  description: pageSeo.contact.description,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
