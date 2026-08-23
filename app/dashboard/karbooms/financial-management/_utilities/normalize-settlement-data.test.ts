import { describe, expect, it } from "vitest";

import normalizeSettlementData from "./normalize-settlement-data";
import type {
  SettlementBreakdownResponse,
  SettlementDataResponse,
  SettlementExpenseCategoryResponse,
} from "../_types/settlement-data";

function buildGroup<T>(items: T[], total: number) {
  return Object.assign(
    {},
    ...items.map((item, index) => ({ [index]: item })),
    { total },
  );
}

function emptyBreakdown(): SettlementBreakdownResponse {
  const emptyExpense: SettlementExpenseCategoryResponse = {
    category: { id: 0, name: "", type: "daily", status: "active" },
    expenses: [],
    total: 0,
  };

  return {
    previous_settlement: buildGroup([], 0),
    profit_loss: buildGroup([], 0),
    expenses_issued: buildGroup([emptyExpense], 0),
    expenses_paid: buildGroup([], 0),
    payments_received: buildGroup([], 0),
    payments_made: buildGroup([], 0),
    payments_registered: buildGroup([], 0),
    incomes_received: buildGroup([], 0),
    salary: buildGroup([], 0),
    service_fee: buildGroup([], 0),
  };
}

function buildResponse(): SettlementDataResponse {
  return {
    total_income: 0,
    total_expense: 0,
    total_salaries: 0,
    total_service_fees: 0,
    total_driver_compensation: 0,
    total_opening_credit: 0,
    total_opening_debt: 0,
    previous_month: null,
    net: 0,
    total_credit: 0,
    total_debt: 0,
    members: [
      {
        karboom_member_id: 1,
        name: "ali",
        is_driver: false,
        id: 1,
        opening_balance: 0,
        share: 6,
        salary: 0,
        service_fee: 0,
        income_held: 0,
        expense_credit: 0,
        payments_in: 0,
        payments_out: 0,
        balance: 0,
        total: 0,
        status: "settled",
        breakdown: emptyBreakdown(),
      },
    ],
  };
}

describe("normalizeSettlementData", () => {
  it("converts numeric-keyed groups into items arrays with totals", () => {
    const response = buildResponse();
    response.members[0].breakdown.previous_settlement = buildGroup(
      ["c", "a", "b"],
      30,
    );

    const normalized = normalizeSettlementData(response);

    expect(normalized.members[0].breakdown.previous_settlement).toEqual({
      total: 30,
      items: ["c", "a", "b"],
    });
  });

  it("keeps totals and copies the rest of the payload", () => {
    const response = buildResponse();

    const normalized = normalizeSettlementData(response);

    expect(normalized.total_income).toBe(0);
    expect(normalized.previous_month).toBeNull();
    expect(normalized.members).toHaveLength(1);
    expect(normalized.members[0].breakdown.profit_loss.total).toBe(0);
  });

  it("stamps expense items with their category name", () => {
    const response = buildResponse();
    response.members[0].breakdown.expenses_issued = buildGroup(
      [
        {
          category: { id: 7, name: "تبییر", type: "repair", status: "active" },
          expenses: [
            {
              id: 11,
              unit_price: 100,
              wage_cost: 0,
              type: "repair",
              description: null,
              date: "2026-08-01",
              total_price: 100,
              category_id: 7,
              sender: { id: 1, user_id: 1, name: "ali" },
              payer: { id: 1, user_id: 1, name: "ali" },
            },
          ],
          total: 100,
        },
      ],
      100,
    );

    const normalized = normalizeSettlementData(response);
    const [category] = normalized.members[0].breakdown.expenses_issued.items;

    expect(category.expenses[0].category_name).toBe("تبییر");
  });
});
