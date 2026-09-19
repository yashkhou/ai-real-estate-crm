import type { Disposition } from "./types.js";

export type FollowUp = { retry: boolean; minDelayHours: number; humanReview: boolean };

export function followUpPolicy(disposition: Disposition): FollowUp {
  switch (disposition) {
    case "QUALIFIED_OPPORTUNITY": return { retry: false, minDelayHours: 0, humanReview: true };
    case "CALLBACK_REQUESTED": return { retry: true, minDelayHours: 1, humanReview: true };
    case "WARM_FOLLOW_UP":
    case "NOT_NOW": return { retry: true, minDelayHours: 72, humanReview: false };
    case "NO_ANSWER":
    case "VOICEMAIL": return { retry: true, minDelayHours: 24, humanReview: false };
    case "DO_NOT_CONTACT":
    case "WRONG_PERSON":
    case "NOT_INTERESTED": return { retry: false, minDelayHours: 0, humanReview: false };
    default: return { retry: false, minDelayHours: 0, humanReview: false };
  }
}
