import type { Evidence } from "./types.js";

export function ageDays(observedAt: string, now = new Date()): number {
  return Math.max(0, (now.getTime() - new Date(observedAt).getTime()) / 86_400_000);
}

export function isCurrent<T>(evidence: Evidence<T>, maxAgeDays: number, now = new Date()): boolean {
  return evidence.approved && ageDays(evidence.observedAt, now) <= maxAgeDays;
}

export function requireCurrent<T>(evidence: Evidence<T>, maxAgeDays: number, label: string, now = new Date()): T {
  if (!isCurrent(evidence, maxAgeDays, now)) throw new Error(label + " is not current and approved");
  return evidence.value;
}
