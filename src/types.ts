export type Evidence<T> = {
  value: T;
  observedAt: string;
  source: "synthetic" | "agent-reviewed";
  approved: boolean;
};

export type BuyerRequirement = {
  id: string;
  budgetMax: number;
  minBedrooms: number;
  communities: string[];
  active: Evidence<boolean>;
};

export type Listing = {
  id: string;
  askingPrice: Evidence<number>;
  bedrooms: number;
  community: string;
  availability: Evidence<"available" | "under-offer" | "withdrawn">;
};

export type Match = {
  buyerId: string;
  listingId: string;
  score: number;
  reasons: string[];
  blockers: string[];
};

export type Disposition =
  | "COMPLETED_CONVERSATION"
  | "QUALIFIED_OPPORTUNITY"
  | "WARM_FOLLOW_UP"
  | "CALLBACK_REQUESTED"
  | "NOT_NOW"
  | "NOT_INTERESTED"
  | "DO_NOT_CONTACT"
  | "WRONG_PERSON"
  | "NO_ANSWER"
  | "VOICEMAIL";
