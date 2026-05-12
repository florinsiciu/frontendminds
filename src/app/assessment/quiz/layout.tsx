import type { Metadata } from "next";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.quiz.title,
  description: pageSeo.quiz.description,
  robots: { index: false, follow: false },
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
