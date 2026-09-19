import { requireCurrent } from "./freshness.js";
import type { BuyerRequirement, Listing, Match } from "./types.js";

export type CallAngle = {
  headline: string;
  factualLead: string;
  question: string;
  evidenceIds: string[];
};

export function buildBuyerCallAngle(buyer: BuyerRequirement, listing: Listing, match: Match, now = new Date()): CallAngle {
  if (match.blockers.length) throw new Error("Cannot build a call angle from a blocked match");
  const price = requireCurrent(listing.askingPrice, 14, "asking price", now);
  requireCurrent(listing.availability, 3, "availability", now);
  requireCurrent(buyer.active, 30, "buyer requirement", now);
  return {
    headline: "Current match worth reviewing",
    factualLead: listing.community + " has an approved available listing at " + price + " matching the stored requirement.",
    question: "Would you like the current details and comparison set?",
    evidenceIds: [listing.id + ":price", listing.id + ":availability", buyer.id + ":active"]
  };
}
