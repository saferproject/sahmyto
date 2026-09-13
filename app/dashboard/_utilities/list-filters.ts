import type { QueryParams } from "@/app/_types/query-params";
import type { Filter, FilterValue, FilterValues } from "../_types/filter";

export function getFilterQueryKeys(filter: Filter): string[] {
  return filter.type === "date"
    ? [filter.queryKeys.min, filter.queryKeys.max]
    : [filter.queryKey];
}

export function emptyFilterValues(filters: readonly Filter[]): FilterValues {
  return Object.fromEntries(
    filters.map((filter) => [
      filter.name,
      filter.type === "date"
        ? ["", ""]
        : filter.type === "boolean"
          ? false
          : "",
    ]),
  );
}

export function normalizeFilterDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/٫/g, ".");
}

export function parseFilterNumber(value: string, price = false): number | null {
  let normalized = normalizeFilterDigits(value).trim();
  if (price && /^\d{1,3}([,٬]\d{3})+$/.test(normalized)) {
    normalized = normalized.replace(/[,٬]/g, "");
  }
  if (!(price ? /^\d+$/ : /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/).test(normalized)) {
    return null;
  }
  const number = Number(normalized);
  return Number.isFinite(number) && Math.abs(number) <= Number.MAX_SAFE_INTEGER
    ? number
    : null;
}

export function isFilterDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}

export function validateFilterValue(
  filter: Filter,
  value: FilterValue,
): true | string {
  if (filter.type === "date") {
    if (!Array.isArray(value)) return "بازه تاریخ معتبر وارد کنید";
    const [min, max] = value;
    if ((min && !isFilterDate(min)) || (max && !isFilterDate(max))) {
      return "تاریخ معتبر وارد کنید";
    }
    return min && max && min > max
      ? "تاریخ پایان باید بعد از تاریخ شروع باشد"
      : true;
  }
  if (filter.type === "boolean")
    return typeof value === "boolean" || "مقدار نامعتبر است";
  if (typeof value !== "string") return "مقدار نامعتبر است";
  if (value.trim() === "") return true;
  if (filter.type === "number" || filter.type === "price") {
    return (
      parseFilterNumber(value, filter.type === "price") !== null ||
      "عدد معتبر وارد کنید"
    );
  }
  if (filter.type === "select") {
    return (
      filter.options.some((option) => option.value === value) ||
      "گزینه معتبر انتخاب کنید"
    );
  }
  return true;
}

export function serializeFilters(
  filters: readonly Filter[],
  values: FilterValues,
): QueryParams {
  const entries: [string, string | number][] = [];
  for (const filter of filters) {
    const value = values[filter.name];
    if (value === undefined || validateFilterValue(filter, value) !== true)
      continue;
    if (filter.type === "date" && Array.isArray(value)) {
      if (value[0]) entries.push([filter.queryKeys.min, value[0]]);
      if (value[1]) entries.push([filter.queryKeys.max, value[1]]);
    } else if (filter.type === "boolean") {
      if (value === true)
        entries.push([filter.queryKey, filter.trueValue ?? "1"]);
    } else if (
      filter.type !== "date" &&
      typeof value === "string" &&
      value.trim() !== ""
    ) {
      entries.push([
        filter.queryKey,
        filter.type === "price" || filter.type === "number"
          ? parseFilterNumber(value, filter.type === "price")!
          : value,
      ]);
    }
  }
  return Object.fromEntries(entries);
}

export function parseFilters(
  filters: readonly Filter[],
  search: string,
): FilterValues {
  const params = new URLSearchParams(search);
  const values = emptyFilterValues(filters);
  for (const filter of filters) {
    let value: FilterValue;
    if (filter.type === "date") {
      value = [filter.queryKeys.min, filter.queryKeys.max].map((key) => {
        const date = params.get(key) ?? "";
        return isFilterDate(date) ? date : "";
      }) as [string, string];
    } else if (filter.type === "boolean") {
      value = params.get(filter.queryKey) === (filter.trueValue ?? "1");
    } else {
      value = params.get(filter.queryKey) ?? "";
    }
    if (validateFilterValue(filter, value) === true)
      values[filter.name] = value;
  }
  return values;
}

/** Returns null when applying would leave the URL unchanged (regardless of key order). */
export function applyFiltersToSearch(
  filters: readonly Filter[],
  values: FilterValues,
  search: string,
): string | null {
  const previous = new URLSearchParams(search);
  const next = new URLSearchParams(search);
  for (const filter of filters) {
    for (const key of getFilterQueryKeys(filter)) next.delete(key);
  }
  for (const [key, value] of Object.entries(
    serializeFilters(filters, values),
  )) {
    next.set(key, String(value));
  }
  next.delete("page");
  previous.sort();
  const sortedNext = new URLSearchParams(next);
  sortedNext.sort();
  return previous.toString() === sortedNext.toString() ? null : next.toString();
}
