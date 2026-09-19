import { matchBuyerToListing } from "./matcher.js";
import { buildBuyerCallAngle } from "./value-angle.js";
import type { BuyerRequirement, Listing } from "./types.js";

const now = new Date("2026-09-01T12:00:00Z");
const buyer: BuyerRequirement = {
  id: "buyer-demo-01",
  budgetMax: 4_500_000,
  minBedrooms: 4,
  communities: ["Demo Hills", "Sample Ranches"],
  active: { value: true, observedAt: "2026-08-28T09:00:00Z", source: "synthetic", approved: true }
};
const listing: Listing = {
  id: "listing-demo-07",
  askingPrice: { value: 4_350_000, observedAt: "2026-08-30T10:00:00Z", source: "synthetic", approved: true },
  bedrooms: 4,
  community: "Sample Ranches",
  availability: { value: "available", observedAt: "2026-08-31T16:00:00Z", source: "synthetic", approved: true }
};
const match = matchBuyerToListing(buyer, listing, now);
console.log(JSON.stringify({ match, callAngle: buildBuyerCallAngle(buyer, listing, match, now) }, null, 2));
