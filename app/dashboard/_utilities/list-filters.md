# Adding filters to a list

Declare a constant beside the list using `as const satisfies readonly ItemFilter<Item>[]`
for autocomplete suggestions from the item's properties (including operator prefixes).
Custom backend keys such as `category__name`, `eq-category__name`, and date-range
keys are also accepted even when they are absent from the item type.
Choose controls from the field's meaning: dates use ranges, prices/amounts use
price inputs, categories/types with fixed values use selects, and `is_settled`
uses a checkbox. A plain `Filter[]` can be used when no item type is needed:

```tsx
import type { Filter } from "@/app/dashboard/_types/filter";

export const LIST_FILTERS = [
  {
    type: "text",
    name: "ownerPhone",
    label: "تلفن مالک",
    queryKey: "owner__phone",
  },
  {
    type: "price",
    name: "maxPrice",
    label: "حداکثر مبلغ",
    queryKey: "max-price",
  },
  {
    type: "date",
    name: "createdAt",
    label: "تاریخ ایجاد",
    queryKeys: { min: "min-created_at", max: "max-created_at" },
  },
] as const satisfies readonly Filter[];
```

Each name must be unique and flat (no dots or brackets). Query keys must also be
unique within the list and must not use the pagination keys `page` or `paginate`.
Keys are sent exactly as declared, including operator prefixes and relation names.

In the parent list, read `queryParams` and `activeCount` from
`useListFilters(LIST_FILTERS)`. Include `queryParams` in the list's query key and
forward it to the service through `http.get(path, { signal, queryParams })`.
Keep the existing query-key prefix for mutation invalidations.

On refresh or a shared-link visit, the hook reads the current URL during the
first render. The initial request already includes those filters; opening the
drawer restores their values. Do not copy them into an initially empty state or
apply them in an effect, which would allow an unfiltered request first.

For Karboom lists, pass `filters={LIST_FILTERS}` to `ListHeaderLayout`.
Its existing icon displays the active count and manages the filter drawer.
Use `hideBackButton` on the top-level Karbooms page. Custom headers can use
`ListFiltersButtonComponent` or render `FiltersDrawerComponent` directly with
`filters`, `title`, `isOpen`, `onOpen`, and `onClose`.
No submission callback or refetch effect is needed.
The drawer updates the URL on Apply; every consumer of the hook observes that
applied state. Put the filter button outside loading, error, and empty-result
branches, and place search-parameter consumers inside a Suspense boundary.

Supported definitions:

| Type      | Control and submitted value                                                                        |
| --------- | -------------------------------------------------------------------------------------------------- |
| `text`    | String; whitespace-only values are omitted                                                         |
| `number`  | Signed decimal input, normalized to a finite number                                                |
| `price`   | Formatted nonnegative integer in toman; zero is preserved                                          |
| `boolean` | Checkbox; true sends `trueValue` (default `"1"`), false omits the key                              |
| `select`  | Single selection from `options: [{ label, value }]`; values are strings                            |
| `date`    | Optional From/To pickers; `queryKeys.min` and `queryKeys.max` receive Gregorian `YYYY-MM-DD` dates |

Definition metadata contains no current values. The hook exposes `values` for
form initialization (strings, booleans, or a pair of date strings), and
`queryParams` for normalized API values. Dynamic select options are supplied by
the parent in the definitions; the filter drawer does not fetch them.

Close discards edits; Clear immediately removes filters from the URL and closes
the drawer, updating the list through its query key. Both Clear and Apply preserve
unrelated URL parameters and the fragment, remove `page`, and create a history
entry only when parameters change. Malformed URL filters are excluded from API
requests. Each date range counts as one active filter, even with two boundaries.

Karbooms, incomes, expenses, drivers, partners, payments, and both insurance
lists each declare their own filter constant. Income and expense amount filters
use the item property `unit_price`; payments use `total_price`. Incomes and
expenses also expose the `is_settled` checkbox.

Pass filters explicitly to endpoint hooks so reusable picker drawers are not
affected by the current page's URL. Most hooks accept `(karboomId, queryParams)`;
drivers retain their existing enablement argument as
`(karboomId, enabled, queryParams)`. Partners accept
`({ ...queryParams, karboom_id: karboomId }, enabled)`; set the route's ID last.
