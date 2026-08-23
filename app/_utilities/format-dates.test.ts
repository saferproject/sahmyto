import { describe, expect, it } from "vitest";

import formatDate from "./format-dates";

describe("formatDate", () => {
  it("formats ISO strings as YYYY/MM/DD by default", () => {
    expect(formatDate("2026-08-22")).toBe("2026/08/22");
  });

  it("formats Date objects", () => {
    expect(formatDate(new Date(2026, 0, 2))).toBe("2026/01/02");
  });

  it("supports a custom format", () => {
    expect(formatDate("2026-08-22", "YYYY")).toBe("2026");
  });
});
