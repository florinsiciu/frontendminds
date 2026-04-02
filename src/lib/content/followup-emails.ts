import type { TierId } from "@/types/assessment";

interface FollowUpContent {
  subject: string;
  preheader: string;
  body: string[];
  ctaText: string;
}

export const followUpDay3: Record<TierId, FollowUpContent> = {
  critical_risk: {
    subject: "Your modernization gaps won't fix themselves",
    preheader: "Your scorecard flagged critical risks — here's what teams in your position do.",
    body: [
      "A few days ago you completed the Angular Modernization Scorecard and landed in the Critical Risk tier.",
      "Teams with similar scores typically face compounding issues: each sprint spent on workarounds makes the eventual migration harder. The gaps don't shrink on their own.",
      "A 30-minute strategy call is the fastest way to turn your score into a concrete action plan. No pitch — just a focused conversation about your specific situation.",
    ],
    ctaText: "Book Your Free Strategy Call",
  },
  modernization_ready: {
    subject: "Your Angular modernization window is open",
    preheader: "Your score shows you're ready to modernize — but windows close.",
    body: [
      "You completed the Angular Modernization Scorecard a few days ago and scored in the Modernization Ready tier.",
      "This is actually the best position to be in: your foundations are solid enough to modernize without a painful rewrite, but there are clear gaps that will get harder to fix later.",
      "A strategy session can help you prioritize which dimensions to tackle first — and which ones can wait.",
    ],
    ctaText: "Book a Free Strategy Session",
  },
  well_positioned: {
    subject: "One step from a competitive edge",
    preheader: "Your Angular setup is strong — here's how to make it exceptional.",
    body: [
      "You scored in the Well-Positioned tier on the Angular Modernization Scorecard — strong across the board.",
      "At this level, the question isn't 'what's broken?' but 'what's the next optimization that compounds?' A few targeted improvements to your weakest dimensions could set your architecture apart.",
      "A quick architecture review can identify those high-leverage opportunities.",
    ],
    ctaText: "Book a Quick Architecture Review",
  },
};

export const followUpDay7: Record<TierId, FollowUpContent> = {
  critical_risk: {
    subject: "Last call: your Angular modernization plan",
    preheader: "One conversation could change your migration trajectory.",
    body: [
      "A week ago, your Angular Modernization Scorecard flagged critical gaps across multiple dimensions.",
      "I've helped teams in similar situations build migration roadmaps that actually work — incremental, low-risk, and aligned with business timelines.",
      "If you've been thinking about next steps, a 30-minute call is the fastest way to get clarity. No commitment required.",
    ],
    ctaText: "Book Your Free Strategy Call",
  },
  modernization_ready: {
    subject: "Your modernization roadmap — one call away",
    preheader: "Turn your scorecard results into a focused action plan.",
    body: [
      "It's been a week since you completed the Angular Modernization Scorecard. Your Modernization Ready score tells me you have real strengths to build on.",
      "The teams that get the most value from this score are the ones that turn it into a roadmap within the first two weeks — before competing priorities push it down the backlog.",
      "One focused conversation can turn your score into a prioritized plan.",
    ],
    ctaText: "Book a Free Strategy Session",
  },
  well_positioned: {
    subject: "Fine-tune your Angular advantage",
    preheader: "Your architecture is strong — a review could make it exceptional.",
    body: [
      "One week ago, your Angular Modernization Scorecard confirmed what you probably already sensed: your setup is in good shape.",
      "For teams at your level, the highest-ROI move is usually a targeted review of the 1-2 dimensions where you scored lowest. Small improvements at the top of the stack compound faster than big improvements at the bottom.",
      "Happy to take a quick look if you're interested — no formal engagement required.",
    ],
    ctaText: "Book a Quick Architecture Review",
  },
};
