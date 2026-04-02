export const EVENTS = {
  ASSESSMENT_STARTED: "assessment_started",
  QUESTION_ANSWERED: "question_answered",
  QUIZ_COMPLETED: "quiz_completed",
  EMAIL_SUBMITTED: "email_submitted",
  RESULTS_VIEWED: "results_viewed",
  CTA_CLICKED: "cta_clicked",
  QUIZ_ABANDONED: "quiz_abandoned",
  EXIT_POPUP_SHOWN: "exit_popup_shown",
  EXIT_POPUP_CONVERTED: "exit_popup_converted",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export interface QuestionAnsweredProps {
  dimension: string;
  question_id: string;
  answer: boolean;
}

export interface QuizCompletedProps {
  total_time: number;
}

export interface ResultsViewedProps {
  tier: string;
  total_percentage: number;
}

export interface CtaClickedProps {
  tier: string;
  cta_type: string;
}

export interface QuizAbandonedProps {
  last_question: string;
  dimension: string;
}

export interface AssessmentStartedProps {
  source: string;
}
