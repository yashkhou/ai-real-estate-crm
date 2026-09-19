import test from "node:test";
import assert from "node:assert/strict";
import { followUpPolicy } from "../disposition.js";

test("do-not-contact never schedules an automated retry", () => {
  assert.deepEqual(followUpPolicy("DO_NOT_CONTACT"), { retry: false, minDelayHours: 0, humanReview: false });
});

test("qualified opportunities require human review", () => {
  assert.equal(followUpPolicy("QUALIFIED_OPPORTUNITY").humanReview, true);
});
