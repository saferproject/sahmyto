import { describe, expect, it } from "vitest";

import isValidQueryId from "./is-valid-query-id";

describe("isValidQueryId", () => {
  it("accepts positive integers", () => {
    expect(isValidQueryId(1)).toBe(true);
    expect(isValidQueryId(999)).toBe(true);
  });

  it("rejects zero, negatives, and non-integers", () => {
    expect(isValidQueryId(0)).toBe(false);
    expect(isValidQueryId(-5)).toBe(false);
    expect(isValidQueryId(1.5)).toBe(false);
    expect(isValidQueryId(NaN)).toBe(false);
  });

  it("rejects null and undefined", () => {
    expect(isValidQueryId(null)).toBe(false);
    expect(isValidQueryId(undefined)).toBe(false);
  });
});
