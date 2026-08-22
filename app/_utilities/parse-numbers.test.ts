import { describe, expect, it } from "vitest";

import parseNumber from "./parse-numbers";

describe("parseNumber", () => {
  it("converts Persian digits to numbers", () => {
    expect(parseNumber("۱۲۳")).toBe(123);
  });

  it("strips non-digit characters", () => {
    expect(parseNumber("12,345 تومان")).toBe(12345);
  });

  it("handles mixed Persian digits and separators", () => {
    expect(parseNumber("۱٬۲۳۴")).toBe(1234);
  });

  it("returns 0 for nullish or empty input", () => {
    expect(parseNumber(null)).toBe(0);
    expect(parseNumber(undefined)).toBe(0);
    expect(parseNumber("")).toBe(0);
    expect(parseNumber("abc")).toBe(0);
  });

  it("passes numbers through", () => {
    expect(parseNumber(500)).toBe(500);
  });
});
