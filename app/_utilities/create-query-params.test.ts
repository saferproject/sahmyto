import { describe, expect, it } from "vitest";

import createQueryParams from "./create-query-params";

describe("createQueryParams", () => {
  it("returns an empty string for nullish input", () => {
    expect(createQueryParams(null)).toBe("");
    expect(createQueryParams(undefined)).toBe("");
  });

  it("serializes entries with a leading question mark", () => {
    expect(createQueryParams({ karboom_id: 3, search: "ali" })).toBe(
      "?karboom_id=3&search=ali",
    );
  });

  it("drops null and undefined values", () => {
    expect(createQueryParams({ a: 1, b: null, c: undefined })).toBe("?a=1");
  });

  it("returns an empty string when every value is filtered out", () => {
    expect(createQueryParams({ a: null })).toBe("");
  });

  it("URL-encodes keys and values", () => {
    expect(createQueryParams({ "ke y": "a&b" })).toBe("?ke%20y=a%26b");
  });
});
