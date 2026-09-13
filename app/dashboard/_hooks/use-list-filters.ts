"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Filter, FilterValues } from "../_types/filter";
import {
  applyFiltersToSearch,
  getFilterQueryKeys,
  parseFilters,
  serializeFilters,
} from "../_utilities/list-filters";

export default function useListFilters(filters: readonly Filter[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Derive applied values synchronously, including on a fresh page load, so
  // the first list request and the drawer both use the filters in the URL.
  const values = parseFilters(filters, searchParams.toString());
  const queryParams = serializeFilters(filters, values);
  const activeCount = filters.filter((filter) =>
    getFilterQueryKeys(filter).some((key) => queryParams[key] !== undefined),
  ).length;

  const apply = (draft: FilterValues) => {
    // Read at submission time so unrelated navigation isn't overwritten.
    const next = applyFiltersToSearch(filters, draft, window.location.search);
    if (next !== null) {
      router.push(
        `${pathname}${next ? `?${next}` : ""}${window.location.hash}`,
        {
          scroll: false,
        },
      );
    }
  };

  return { values, queryParams, activeCount, apply };
}
