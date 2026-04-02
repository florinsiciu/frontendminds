"use client";

import { useEffect } from "react";
import { posthog } from "@/lib/posthog";
import { EVENTS } from "@/lib/config/analytics";
import type { TierId } from "@/types/assessment";

interface TrackViewProps {
  tier: TierId;
  totalPercentage: number;
}

export function TrackResultsView({ tier, totalPercentage }: TrackViewProps) {
  useEffect(() => {
    posthog.capture(EVENTS.RESULTS_VIEWED, {
      tier,
      total_percentage: totalPercentage,
    });
  }, [tier, totalPercentage]);

  return null;
}
