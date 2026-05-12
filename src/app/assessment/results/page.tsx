import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { pageSeo } from "@/lib/content/seo";

export const metadata: Metadata = {
  title: pageSeo.results.title,
  description: pageSeo.results.description,
  robots: { index: false },
};

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;

  if (id && typeof id === "string") {
    redirect(`/assessment/results/${id}`);
  }

  redirect("/assessment");
}
