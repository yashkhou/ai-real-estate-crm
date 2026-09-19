import { isCurrent } from "./freshness.js";
import type { BuyerRequirement, Listing, Match } from "./types.js";

export function matchBuyerToListing(buyer: BuyerRequirement, listing: Listing, now = new Date()): Match {
  const reasons: string[] = [];
  const blockers: string[] = [];
  if (!isCurrent(buyer.active, 30, now) || !buyer.active.value) blockers.push("buyer requirement is stale or inactive");
  if (!isCurrent(listing.askingPrice, 14, now)) blockers.push("asking price is stale or unapproved");
  if (!isCurrent(listing.availability, 3, now) || listing.availability.value !== "available") {
    blockers.push("listing availability is not currently approved as available");
  }
  if (listing.bedrooms < buyer.minBedrooms) blockers.push("bedroom requirement not met");
  if (!buyer.communities.includes(listing.community)) blockers.push("community requirement not met");
  const price = listing.askingPrice.value;
  if (price > buyer.budgetMax) blockers.push("asking price exceeds budget");
  else reasons.push("within approved budget");
  if (listing.bedrooms >= buyer.minBedrooms) reasons.push("bedroom requirement met");
  if (buyer.communities.includes(listing.community)) reasons.push("community requirement met");
  if (blockers.length === 0) reasons.push("all current evidence checks passed");
  const score = blockers.length ? 0 : Math.min(100, 70 + reasons.length * 10);
  return { buyerId: buyer.id, listingId: listing.id, score, reasons, blockers };
}
