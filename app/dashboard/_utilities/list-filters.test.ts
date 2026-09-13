import { describe, expect, it } from "vitest";
import type { Filter, ItemFilter } from "../_types/filter";
import {
  applyFiltersToSearch,
  emptyFilterValues,
  parseFilterNumber,
  parseFilters,
  serializeFilters,
  validateFilterValue,
} from "./list-filters";

const filters = [
  { type: "text", name: "name", label: "Name", queryKey: "notEq-full_name" },
  { type: "text", name: "phone", label: "Phone", queryKey: "owner__phone" },
  {
    type: "number",
    name: "quantity",
    label: "Quantity",
    queryKey: "min-quantity",
  },
  { type: "price", name: "price", label: "Price", queryKey: "price" },
  {
    type: "boolean",
    name: "settled",
    label: "Settled",
    queryKey: "is_settled",
  },
  {
    type: "boolean",
    name: "accepted",
    label: "Accepted",
    queryKey: "accepted",
    trueValue: "true",
  },
  {
    type: "select",
    name: "kind",
    label: "Kind",
    queryKey: "type",
    options: [{ value: "0", label: "Zero" }],
  },
  {
    type: "date",
    name: "date",
    label: "Date",
    queryKeys: { min: "min-ended_at", max: "max-ended_at" },
  },
] as const satisfies readonly Filter[];

describe("list filters", () => {
  it("round trips configured relation and backend-only keys absent from the item type", () => {
    const definitions = [
      {
        type: "text",
        name: "category",
        label: "Category",
        queryKey: "category__name",
      },
      {
        type: "text",
        name: "external",
        label: "External",
        queryKey: "custom_search",
      },
      {
        type: "date",
        name: "audit",
        label: "Audit",
        queryKeys: {
          min: "min-audit__created_at",
          max: "max-audit__created_at",
        },
      },
    ] as const satisfies readonly ItemFilter<{ id: number }>[];
    const search = new URLSearchParams({
      category__name: "روغن",
      custom_search: "test",
      "min-audit__created_at": "2026-01-01",
      "max-audit__created_at": "2026-01-30",
    }).toString();
    const values = parseFilters(definitions, search);
    expect(values).toEqual({
      category: "روغن",
      external: "test",
      audit: ["2026-01-01", "2026-01-30"],
    });
    expect(serializeFilters(definitions, values)).toEqual(
      Object.fromEntries(new URLSearchParams(search)),
    );
  });

  it("round trips all types, Persian text, operators, relations, and zero", () => {
    const values = {
      name: "رضا & علی",
      phone: "09934142558",
      quantity: "-1.5",
      price: "0",
      settled: true,
      accepted: true,
      kind: "0",
      date: ["2026-01-01", "2026-01-30"] as [string, string],
    };
    const query = serializeFilters(filters, values);
    expect(query).toEqual({
      "notEq-full_name": "رضا & علی",
      owner__phone: "09934142558",
      "min-quantity": -1.5,
      price: 0,
      is_settled: "1",
      accepted: "true",
      type: "0",
      "min-ended_at": "2026-01-01",
      "max-ended_at": "2026-01-30",
    });
    const search = applyFiltersToSearch(filters, values, "")!;
    expect(parseFilters(filters, search)).toEqual(values);
  });

  it("omits all empty controls and unchecked checkboxes", () => {
    expect(serializeFilters(filters, emptyFilterValues(filters))).toEqual({});
    expect(parseFilters(filters, "is_settled=0&accepted=false")).toMatchObject({
      settled: false,
      accepted: false,
    });
  });

  it.each([
    "abc",
    "1abc",
    "Infinity",
    "NaN",
    "1e5",
    "9007199254740992",
    "-20",
    "1.5",
    "1,23",
  ])("excludes invalid price %s from requests", (price) => {
    const values = parseFilters(
      filters,
      new URLSearchParams({ price }).toString(),
    );
    expect(values.price).toBe("");
    expect(serializeFilters(filters, values)).toEqual({});
  });

  it("normalizes Persian and Arabic digits and formatted prices", () => {
    expect(parseFilterNumber("۱٬۴۰۰٬۰۰۰", true)).toBe(1400000);
    expect(parseFilterNumber("١٤٠٠٠٠٠", true)).toBe(1400000);
    expect(parseFilterNumber("-۱٫۵")).toBe(-1.5);
    expect(parseFilterNumber("1,400,000", true)).toBe(1400000);
  });

  it("excludes invalid selections and dates without forwarding unknown URL keys", () => {
    const values = parseFilters(
      filters,
      "type=unknown&min-ended_at=2026-02-30&max-ended_at=2026-03-01&admin=1",
    );
    expect(serializeFilters(filters, values)).toEqual({
      "max-ended_at": "2026-03-01",
    });
  });

  it("supports open-ended and leap-day ranges but rejects reversed ranges", () => {
    const dateFilter = filters[7];
    expect(validateFilterValue(dateFilter, ["2024-02-29", ""])).toBe(true);
    expect(validateFilterValue(dateFilter, ["", "2026-01-01"])).toBe(true);
    expect(validateFilterValue(dateFilter, ["2026-01-01", "2026-01-01"])).toBe(
      true,
    );
    expect(validateFilterValue(dateFilter, ["2026-02-29", ""])).not.toBe(true);
    expect(
      validateFilterValue(dateFilter, ["2026-02-01", "2026-01-01"]),
    ).not.toBe(true);
    expect(
      serializeFilters(
        filters,
        parseFilters(
          filters,
          "min-ended_at=2026-02-01&max-ended_at=2026-01-01",
        ),
      ),
    ).toEqual({});
  });

  it("replaces owned keys, clears pagination, and preserves unrelated repeated parameters", () => {
    const next = applyFiltersToSearch(
      filters,
      { price: "200" },
      "price=10&price=20&page=4&tab=a&tab=b&sort=desc",
    );
    const params = new URLSearchParams(next!);
    expect(params.getAll("price")).toEqual(["200"]);
    expect(params.has("page")).toBe(false);
    expect(params.getAll("tab")).toEqual(["a", "b"]);
    expect(params.get("sort")).toBe("desc");
    expect(
      applyFiltersToSearch(filters, emptyFilterValues(filters), next!),
    ).toBe("tab=a&tab=b&sort=desc");
  });

  it("skips equivalent updates despite different key order and URL encoding", () => {
    expect(
      applyFiltersToSearch(
        filters,
        { name: "a b", price: "200" },
        "price=200&notEq-full_name=a%20b&tab=a",
      ),
    ).toBeNull();
    expect(
      applyFiltersToSearch(filters, emptyFilterValues(filters), ""),
    ).toBeNull();
  });
});
