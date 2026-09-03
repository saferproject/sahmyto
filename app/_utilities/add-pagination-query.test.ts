import { describe, expect, it } from "vitest";

import addPaginationQuery from "./add-pagination-query";

describe("addPaginationQuery", () => {
  it("adds pagination to a path without query parameters", () => {
    expect(addPaginationQuery("karboom", 3)).toBe("karboom?paginate=1&page=3");
  });

  it("preserves existing query parameters", () => {
    expect(addPaginationQuery("partners?name=Ali", 2)).toBe(
      "partners?name=Ali&paginate=1&page=2",
    );
  });
});
