import test from "node:test";
import assert from "node:assert/strict";
import { matchBuyerToListing } from "../matcher.js";
import type { BuyerRequirement, Listing } from "../types.js";

const now = new Date("2026-09-01T12:00:00Z");
const buyer: BuyerRequirement = {
  id: "buyer-test", budgetMax: 5_000_000, minBedrooms: 3, communities: ["Sample Ranches"],
  active: { value: true, observedAt: "2026-08-25T12:00:00Z", source: "synthetic", approved: true }
};

test("current matching evidence produces an actionable match", () => {
  const listing: Listing = {
    id: "listing-test",
    askingPrice: { value: 4_900_000, observedAt: "2026-08-30T12:00:00Z", source: "synthetic", approved: true },
    bedrooms: 3, community: "Sample Ranches",
    availability: { value: "available", observedAt: "2026-08-31T12:00:00Z", source: "synthetic", approved: true }
  };
  const match = matchBuyerToListing(buyer, listing, now);
  assert.equal(match.blockers.length, 0);
  assert.ok(match.score >= 90);
});

test("stale availability blocks the match", () => {
  const listing: Listing = {
    id: "listing-stale",
    askingPrice: { value: 4_900_000, observedAt: "2026-08-30T12:00:00Z", source: "synthetic", approved: true },
    bedrooms: 3, community: "Sample Ranches",
    availability: { value: "available", observedAt: "2026-08-01T12:00:00Z", source: "synthetic", approved: true }
  };
  assert.ok(matchBuyerToListing(buyer, listing, now).blockers.length > 0);
});
