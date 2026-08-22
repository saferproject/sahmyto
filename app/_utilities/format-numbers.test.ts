import { describe, expect, it } from "vitest";

import formatNumber from "./format-numbers";

describe("formatNumber", () => {
  it("groups thousands with commas", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
  });

  it("returns small numbers unchanged", () => {
    expect(formatNumber(42)).toBe("42");
  });

  it("formats zero and negative numbers", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(-2500)).toBe("-2,500");
  });
});
