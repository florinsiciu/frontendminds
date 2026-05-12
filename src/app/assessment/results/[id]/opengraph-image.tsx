import { ImageResponse } from "next/og";
import { createClient } from "@/lib/supabase/server";
import { TIER_MAP } from "@/lib/config/scoring";
import { DIMENSIONS } from "@/lib/data/questions";
import { DIMENSION_ORDER, DIMENSION_COLORS } from "@/lib/config/scoring";
import type { DimensionPercentages, TierId } from "@/types/assessment";

export const alt = "Angular Modernization Score";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from("assessments")
    .select("total_percentage, dimension_percentages, tier")
    .eq("id", id)
    .single<{
      total_percentage: number;
      dimension_percentages: DimensionPercentages;
      tier: TierId;
    }>();

  const score = data?.total_percentage ?? 0;
  const tier = data?.tier ? TIER_MAP[data.tier] : TIER_MAP.critical_risk;
  const dimPercentages = data?.dimension_percentages;

  const scoreColor =
    score <= 40 ? "#EF4444" : score <= 74 ? "#F59E0B" : "#10B981";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "50px 60px",
          background: "#0F172A",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: `linear-gradient(90deg, ${scoreColor}, #6366F1)`,
          }}
        />

        {/* Top: tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
              color: scoreColor,
              backgroundColor: `${scoreColor}22`,
            }}
          >
            {tier.label}
          </div>
          <div style={{ display: "flex", fontSize: "16px", color: "#94A3BB" }}>
            Angular Modernization Assessment
          </div>
        </div>

        {/* Middle: score + dimensions */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: "60px",
          }}
        >
          {/* Score circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "180px",
                height: "180px",
                borderRadius: "90px",
                border: `6px solid ${scoreColor}`,
                background: `${scoreColor}11`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: "72px",
                  fontWeight: 700,
                  color: scoreColor,
                }}
              >
                {score}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "18px",
                color: "#94A3BB",
                marginTop: "4px",
              }}
            >
              out of 100
            </div>
          </div>

          {/* Dimension bars */}
          {dimPercentages && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "14px",
              }}
            >
              {DIMENSION_ORDER.map((dimId) => {
                const dim = DIMENSIONS.find((d) => d.id === dimId);
                const pct = dimPercentages[dimId] ?? 0;
                const color = DIMENSION_COLORS[dimId];
                return (
                  <div
                    key={dimId}
                    style={{ display: "flex", flexDirection: "column", gap: "4px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "14px",
                      }}
                    >
                      <div style={{ display: "flex", color: "#CBD5E1" }}>
                        {dim?.label ?? dimId}
                      </div>
                      <div style={{ display: "flex", color, fontWeight: 600 }}>
                        {pct}%
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        height: "10px",
                        borderRadius: "5px",
                        background: "#1E293B",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "100%",
                          borderRadius: "5px",
                          background: color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "26px",
                fontWeight: 700,
                color: "#F1F5F9",
                letterSpacing: "-0.02em",
              }}
            >
              Frontend
              <span style={{ color: "#818CF8" }}>Minds</span>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: "16px", color: "#64748B" }}>
            frontendminds.com/assessment
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
