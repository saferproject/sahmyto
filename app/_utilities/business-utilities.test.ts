import { describe, expect, it } from "vitest";

import { transformNumber } from "./transform-numbers";
import formatTime from "@/app/dashboard/tutorial/_utilities/format-time";
import createFinancialMonthSummary, {
  getDailyExpenseTotal,
  getExpenseTotal,
  getIncomeTotal,
} from "@/app/dashboard/karbooms/financial-management/_utilities/create-financial-month-summary";
import groupSalariesByType from "@/app/dashboard/karbooms/financial-management/drivers-salary/_utilities/group-salaries-by-type";
import organizeDriverSalary from "@/app/dashboard/karbooms/financial-management/drivers-salary/_utilities/organize-driver-salary";
import sumSalaryAmounts from "@/app/dashboard/karbooms/financial-management/drivers-salary/_utilities/sum-salary-amounts";

describe("transformNumber", () => {
  it.each([
    [0, "صفر"],
    [1, "یک"],
    [11, "یازده"],
    [21, "بیست و یک"],
    [105, "صد و پنج"],
    [1_001, "یک هزار و یک"],
    [1_000_000, "یک میلیون"],
  ] as const)("converts %s to Persian words", (value, expected) => {
    expect(transformNumber(value)).toBe(expected);
  });

  it.each([-1, 1.5, Number.NaN, 1_000_000_000_000_000])(
    "rejects unsupported value %s",
    (value) => {
      expect(() => transformNumber(value)).toThrow();
    },
  );
});

describe("formatTime", () => {
  it.each([
    [0, "0:00"],
    [5, "0:05"],
    [65, "1:05"],
    [3_599, "59:59"],
  ] as const)("formats %s seconds", (seconds, expected) => {
    expect(formatTime(seconds)).toBe(expected);
  });
});

describe("financial month summary", () => {
  const incomes = [
    { id: 1, type: "daily", quantity: 2, unit_price: 100 },
    { id: 2, type: "monthly", quantity: 1, unit_price: 500 },
  ] as never;
  const expenses = [
    {
      id: 1,
      type: "daily",
      category: "fuel",
      unit_price: 100,
      wage_cost: 0,
    },
    {
      id: 2,
      type: "daily",
      category: "fuel",
      unit_price: 50,
      wage_cost: 10,
    },
    {
      id: 3,
      type: "repair",
      category: "engine",
      unit_price: 200,
      wage_cost: 75,
    },
  ] as never;

  it("calculates income and expense totals", () => {
    expect(getIncomeTotal(incomes)).toBe(700);
    expect(getExpenseTotal(expenses)).toBe(435);
    expect(getDailyExpenseTotal(expenses)).toBe(350);
    expect(getIncomeTotal()).toBe(0);
    expect(getExpenseTotal()).toBe(0);
  });

  it("groups incomes and expenses for rendering", () => {
    const summary = createFinancialMonthSummary({
      id: 41,
      date: "2026-01",
      status: "open",
      incomes,
      expenses,
      payments: [],
    });

    expect(summary.totalIncome).toBe(700);
    expect(summary.totalExpense).toBe(435);
    expect(summary.incomesByType.daily).toHaveLength(1);
    expect(summary.expensesByType.daily).toHaveLength(2);
    expect(summary.dailyExpensesByCategory.fuel).toHaveLength(2);
    expect(summary.repairExpensesByCategory.engine).toHaveLength(1);
  });

  it("returns stable empty groups when no month is selected", () => {
    const summary = createFinancialMonthSummary();

    expect(summary.totalIncome).toBe(0);
    expect(summary.totalExpense).toBe(0);
    expect(summary.incomesByType).toEqual({});
    expect(summary.expensesByType).toEqual({});
  });
});

describe("driver salary organization", () => {
  const salary = (
    id: number,
    type: "salary" | "bonus" | "penalty",
    salaryType: "fixed" | "service" | "percentage",
    amount: number,
  ) =>
    ({
      id,
      type,
      salary_type: salaryType,
      amount,
    }) as never;

  it("groups salary records by calculation type", () => {
    const fixed = salary(1, "salary", "fixed", 100);
    const service = salary(2, "salary", "service", 200);
    const percentage = salary(3, "salary", "percentage", 300);

    expect(groupSalariesByType([fixed, service, percentage])).toEqual({
      fixed: [fixed],
      service: [service],
      percentage: [percentage],
    });
  });

  it("separates base salary, bonuses, and penalties", () => {
    const fixed = salary(1, "salary", "fixed", 100);
    const bonus = salary(2, "bonus", "fixed", 20);
    const penalty = salary(3, "penalty", "fixed", 10);

    const result = organizeDriverSalary({
      id: 7,
      full_name: "Ali Ahmadi",
      salaries: [fixed, bonus, penalty],
    } as never);

    expect(result.salaries.fixed).toEqual([fixed]);
    expect(result.bonuses).toEqual([bonus]);
    expect(result.penalties).toEqual([penalty]);
  });

  it("sums positive and negative salary values", () => {
    expect(
      sumSalaryAmounts([
        salary(1, "salary", "fixed", 100),
        salary(2, "penalty", "fixed", -25),
      ]),
    ).toBe(75);
    expect(sumSalaryAmounts([])).toBe(0);
  });
});
