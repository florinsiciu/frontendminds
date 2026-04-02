import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { createClient } from "@/lib/supabase/server";
import { ReportDocument } from "@/lib/pdf/report-document";
import type { DimensionPercentages, TierId } from "@/types/assessment";

interface ReportRow {
  id: string;
  total_percentage: number;
  dimension_percentages: DimensionPercentages;
  tier: TierId;
  completed_at: string;
  leads: { first_name: string };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return new Response("Missing assessment ID", { status: 400 });
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assessments")
    .select(
      "id, total_percentage, dimension_percentages, tier, completed_at, leads(first_name)",
    )
    .eq("id", id)
    .single<ReportRow>();

  if (error || !data) {
    return new Response("Assessment not found", { status: 404 });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- renderToBuffer expects ReactElement<DocumentProps> but our wrapper returns the Document internally
    const element = createElement(ReportDocument, {
      firstName: data.leads.first_name,
      completedAt: data.completed_at,
      totalPercentage: data.total_percentage,
      dimensionPercentages: data.dimension_percentages,
      tier: data.tier,
    }) as any;

    const buffer = await renderToBuffer(element);

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="angular-modernization-report.pdf"',
      },
    });
  } catch (err) {
    console.error("PDF generation failed:", err);
    return new Response("Failed to generate report", { status: 500 });
  }
}
