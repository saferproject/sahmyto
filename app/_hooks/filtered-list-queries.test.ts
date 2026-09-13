/* eslint-disable react-hooks/rules-of-hooks -- endpoint adapters are exercised with the React Query hook mocked */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { QueryParams } from "@/app/_types/query-params";
import type { Filter, FilterValues } from "@/app/dashboard/_types/filter";
import { serializeFilters } from "@/app/dashboard/_utilities/list-filters";

interface CapturedOptions {
  queryKey: readonly unknown[];
  enabled?: boolean;
  queryFn: (
    page: number,
    signal: AbortSignal,
    queryKey: readonly unknown[],
  ) => Promise<unknown>;
}
const mocks = vi.hoisted(() => ({
  query: vi.fn((options: CapturedOptions) => options),
  fetch: vi.fn(),
}));
vi.mock("@/app/_hooks/use-infinite-list-query", () => ({
  default: mocks.query,
}));
vi.mock("@/app/proxy", () => ({ fetchWithAuth: mocks.fetch }));

import useGetKarboomsEndpoint from "@/app/dashboard/karbooms/_hooks/use-get-karbooms-endpoint";
import { KARBOOM_FILTERS } from "@/app/dashboard/karbooms/_constants/karboom-filters";
import useGetIncomes from "@/app/dashboard/karbooms/[karboomId]/incomes-list/_hooks/use-get-incomes";
import { INCOME_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/incomes-list/_constants/income-filters";
import useGetExpenses from "@/app/dashboard/karbooms/[karboomId]/expenses-list/_hooks/use-get-expenses";
import { EXPENSE_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/expenses-list/_constants/expense-filters";
import useGetDriversEndpoint from "@/app/dashboard/karbooms/[karboomId]/drivers-list/_hooks/use-get-karboom-drivers-endpoint";
import { DRIVER_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/drivers-list/_constants/driver-filters";
import useGetPartnersEndpoint from "@/app/dashboard/karbooms/[karboomId]/partners-list/_hooks/use-get-partners-endpoint";
import { PARTNER_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/partners-list/_constants/partner-filters";
import useGetPaymentsEndpoint from "@/app/dashboard/karbooms/[karboomId]/payments-list/_hooks/use-get-payments-endpoint";
import { PAYMENT_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/payments-list/_constants/payment-filters";
import useGetBodyInsurancesEndpoint from "@/app/dashboard/karbooms/[karboomId]/body-insurance-list/_hooks/use-get-body-insurances-endpoint";
import { BODY_INSURANCE_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/body-insurance-list/_constants/body-insurance-filters";
import useGetThirdPartyInsurancesEndpoint from "@/app/dashboard/karbooms/[karboomId]/third-party-insurance-list/_hooks/use-get-third-party-insurances-endpoint";
import { THIRD_PARTY_INSURANCE_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/third-party-insurance-list/_constants/third-party-insurance-filters";

type FilterCase = {
  name: string;
  definitions: readonly Filter[];
  values: FilterValues;
  expected: QueryParams;
  prefix: readonly unknown[];
  path: string;
  invoke: (params: QueryParams) => unknown;
};

const cases: FilterCase[] = [
  {
    name: "karbooms",
    definitions: KARBOOM_FILTERS,
    values: { name: "رضا & علی", type: "distance" },
    expected: { name: "رضا & علی", type: "distance" },
    prefix: ["karbooms"],
    path: "/karboom",
    invoke: (params) => useGetKarboomsEndpoint(params),
  },
  {
    name: "incomes",
    definitions: INCOME_FILTERS,
    values: {
      unit_price: "۱۴۰۰۰۰۰",
      endedAt: ["2026-01-01", "2026-01-30"],
      is_settled: true,
      type: "monthly",
    },
    expected: {
      unit_price: 1400000,
      "min-ended_at": "2026-01-01",
      "max-ended_at": "2026-01-30",
      is_settled: "1",
      type: "monthly",
    },
    prefix: ["incomes", 7],
    path: "/karboom/income/karboom/7",
    invoke: (params) => useGetIncomes(7, params),
  },
  {
    name: "expenses",
    definitions: EXPENSE_FILTERS,
    values: {
      unit_price: "0",
      wage_cost: "2000",
      date: ["2026-01-01", ""],
      category: "روغن",
      type: "repair",
      is_settled: true,
    },
    expected: {
      unit_price: 0,
      wage_cost: 2000,
      "min-date": "2026-01-01",
      category__name: "روغن",
      type: "repair",
      is_settled: "1",
    },
    prefix: ["expenses", 7],
    path: "/karboom/expense/karboom/7",
    invoke: (params) => useGetExpenses(7, params),
  },
  {
    name: "drivers",
    definitions: DRIVER_FILTERS,
    values: {
      full_name: "رضا",
      payment_type: "monthly",
      fixed_amount: "2000",
      ended_at: ["", "2026-12-31"],
    },
    expected: {
      full_name: "رضا",
      payment_type: "monthly",
      fixed_amount: 2000,
      "max-ended_at": "2026-12-31",
    },
    prefix: ["drivers", 7],
    path: "/karboom/drivers/7",
    invoke: (params) => useGetDriversEndpoint(7, true, params),
  },
  {
    name: "partners",
    definitions: PARTNER_FILTERS,
    values: { full_name: "Ali Reza", share: "0.5", status: "approved" },
    expected: { full_name: "Ali Reza", share: 0.5, status: "approved" },
    prefix: ["partners"],
    path: "/karboom/partners/7",
    invoke: (params) => useGetPartnersEndpoint({ ...params, karboom_id: 7 }),
  },
  {
    name: "payments",
    definitions: PAYMENT_FILTERS,
    values: {
      total_price: "1000",
      type: "cash",
      date: ["2026-01-01", "2026-01-30"],
    },
    expected: {
      total_price: 1000,
      type: "cash",
      "min-date": "2026-01-01",
      "max-date": "2026-01-30",
    },
    prefix: ["payments", 7],
    path: "/karboom/payment/7",
    invoke: (params) => useGetPaymentsEndpoint(7, params),
  },
  {
    name: "body insurance",
    definitions: BODY_INSURANCE_FILTERS,
    values: {
      started_at: ["2026-01-01", ""],
      ended_at: ["", "2026-12-31"],
      status: "expired",
    },
    expected: {
      "min-started_at": "2026-01-01",
      "max-ended_at": "2026-12-31",
      status: "expired",
    },
    prefix: ["body-insurances", 7],
    path: "/insurance/body/7",
    invoke: (params) => useGetBodyInsurancesEndpoint(7, params),
  },
  {
    name: "third-party insurance",
    definitions: THIRD_PARTY_INSURANCE_FILTERS,
    values: {
      started_at: ["2026-01-01", ""],
      ended_at: ["", "2026-12-31"],
      status: "active",
    },
    expected: {
      "min-started_at": "2026-01-01",
      "max-ended_at": "2026-12-31",
      status: "active",
    },
    prefix: ["third-party-insurances", 7],
    path: "/insurance/third-party/7",
    invoke: (params) => useGetThirdPartyInsurancesEndpoint(7, params),
  },
];

beforeEach(() => {
  vi.clearAllMocks();
  mocks.fetch.mockResolvedValue({ data: [], message: "" });
});

describe("filtered list endpoint contracts", () => {
  it.each(cases)(
    "sends $name filters on every page with distinct query keys",
    async ({ name, definitions, values, expected, prefix, path, invoke }) => {
      const params = serializeFilters(definitions, values);
      expect(params).toEqual(expected);
      invoke(params);
      const options = mocks.query.mock.calls[0][0];
      expect(options.queryKey).toEqual([
        ...prefix,
        name === "partners" ? { ...expected, karboom_id: 7 } : expected,
      ]);
      const signal = new AbortController().signal;
      for (const page of [1, 2]) {
        await options.queryFn(page, signal, options.queryKey);
        const [requestPath, requestOptions] = mocks.fetch.mock.calls.at(-1)!;
        const url = new URL(requestPath, "https://example.test");
        expect(url.pathname).toBe(path);
        expect(Object.fromEntries(url.searchParams)).toEqual({
          ...Object.fromEntries(
            Object.entries(expected).map(([key, value]) => [
              key,
              String(value),
            ]),
          ),
          paginate: "1",
          page: String(page),
        });
        expect(requestOptions.signal).toBe(signal);
      }

      invoke({});
      const cleared = mocks.query.mock.calls.at(-1)![0];
      expect(cleared.queryKey).not.toEqual(options.queryKey);
      await cleared.queryFn(1, signal, cleared.queryKey);
      expect(
        Object.fromEntries(
          new URL(mocks.fetch.mock.calls.at(-1)![0], "https://example.test")
            .searchParams,
        ),
      ).toEqual({ paginate: "1", page: "1" });
    },
  );

  it("leaves driver and partner picker callers unfiltered and preserves enablement", () => {
    useGetDriversEndpoint(7, false);
    expect(mocks.query.mock.calls.at(-1)![0]).toMatchObject({
      enabled: false,
      queryKey: ["drivers", 7, {}],
    });
    useGetPartnersEndpoint({ karboom_id: 7 }, false);
    expect(mocks.query.mock.calls.at(-1)![0]).toMatchObject({
      enabled: false,
      queryKey: ["partners", { karboom_id: 7 }],
    });
  });
});
