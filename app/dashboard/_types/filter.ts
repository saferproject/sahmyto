type FilterBase = {
  /** Unique form field name; use a flat name without dots or brackets. */
  name: string;
  label: string;
};

export type Filter<QueryKey extends string = string> = FilterBase &
  (
    | { type: "text" | "number" | "price"; queryKey: QueryKey }
    | { type: "boolean"; queryKey: QueryKey; trueValue?: string }
    | { type: "date"; queryKeys: { min: QueryKey; max: QueryKey } }
    | {
        type: "select";
        queryKey: QueryKey;
        options: readonly { label: string; value: string }[];
      }
  );

/** Suggest item properties while allowing backend-only keys and relation paths. */
export type ItemFilter<Item> = Filter<
  | Extract<keyof Item, string>
  | `${"min" | "max" | "eq" | "notEq"}-${Extract<keyof Item, string>}`
  | (string & Record<never, never>)
>;

export type FilterValue = string | boolean | [string, string];
export type FilterValues = Record<string, FilterValue>;
