"use client";

import Image from "next/image";
import { ArrowDown2 } from "iconsax-reactjs";
import { useState } from "react";

import formatNumber from "@/app/_utilities/format-numbers";
import type { ExpenseCategoryTypes } from "../../_types/expense-category-types";
import type { IncomeTypes } from "../../_types/income-categories";
import type { FinancialMonthSummary } from "../_utilities/create-financial-month-summary";
import {
  getDailyExpenseTotal,
  getExpenseTotal,
  getIncomeTotal,
} from "../_utilities/create-financial-month-summary";

const INCOME_TYPES: Array<{ type: IncomeTypes; label: string }> = [
  { type: "monthly", label: "ماهانه" },
  { type: "daily", label: "روزانه" },
  { type: "hourly", label: "ساعتی" },
  { type: "services", label: "سرویسی" },
];

const EXPENSE_TYPES: Array<{ type: ExpenseCategoryTypes; label: string }> = [
  { type: "daily", label: "روزانه" },
  { type: "repair", label: "تعمیرات" },
];

function Amount({
  value,
  spacing = "gap-2",
}: {
  value: number;
  spacing?: "gap-2" | "gap-4";
}) {
  return (
    <div className={`flex items-center ${spacing}`}>
      <p>{formatNumber(value)}</p>
      <Image
        src="/images/toman-secondary.webp"
        alt="تومان"
        width={24}
        height={24}
      />
    </div>
  );
}

function DisclosureHeader({
  label,
  total,
  isOpen,
  onToggle,
  hasBackground = true,
}: {
  label: string;
  total: number;
  isOpen: boolean;
  onToggle: () => void;
  hasBackground?: boolean;
}) {
  return (
    <div
      className={`border-secondary flex w-full items-center justify-between rounded-2xl border p-4 ${hasBackground ? "bg-white" : ""}`}
      onClick={onToggle}
    >
      <p>{label}</p>
      <div className="flex items-center gap-4">
        <Amount value={total} spacing="gap-4" />
        <ArrowDown2
          size="24"
          className={`transition-all ${isOpen ? "rotate-z-180" : ""}`}
        />
      </div>
    </div>
  );
}

function disclosureClass(isOpen: boolean) {
  return `text-body overflow-y-hidden transition-all duration-300 ${
    isOpen ? "max-h-1000" : "max-h-14.5"
  }`;
}

export default function OpenFinancialMonthDetails({
  summary,
}: {
  summary: FinancialMonthSummary;
}) {
  const [isIncomeOpen, setIncomeOpen] = useState(false);
  const [openIncomeTypes, setOpenIncomeTypes] = useState<
    Partial<Record<IncomeTypes, boolean>>
  >({});
  const [isExpenseOpen, setExpenseOpen] = useState(false);
  const [openExpenseTypes, setOpenExpenseTypes] = useState<
    Partial<Record<ExpenseCategoryTypes, boolean>>
  >({});
  const [openDailyCategories, setOpenDailyCategories] = useState<
    Record<string, boolean>
  >({});
  const [openRepairCategories, setOpenRepairCategories] = useState<
    Record<string, boolean>
  >({});

  const toggleIncomeType = (type: IncomeTypes) => {
    setOpenIncomeTypes((current) => ({
      ...current,
      [type]: !current[type],
    }));
  };

  const toggleExpenseType = (type: ExpenseCategoryTypes) => {
    setOpenExpenseTypes((current) => ({
      ...current,
      [type]: !current[type],
    }));
  };

  const toggleCategory = (category: string, type: ExpenseCategoryTypes) => {
    const setCategories =
      type === "daily" ? setOpenDailyCategories : setOpenRepairCategories;

    setCategories((current) => ({
      ...current,
      [category]: !current[category],
    }));
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      <li className={disclosureClass(isIncomeOpen)}>
        <DisclosureHeader
          label="درآمد"
          total={summary.totalIncome}
          isOpen={isIncomeOpen}
          onToggle={() => setIncomeOpen((current) => !current)}
        />
        <ul className="mt-4 flex w-full flex-col gap-4 pr-4">
          {INCOME_TYPES.map(({ type, label }) => {
            const incomes = summary.incomesByType[type] ?? [];
            const isOpen = openIncomeTypes[type] ?? false;

            return (
              <li key={type} className={disclosureClass(isOpen)}>
                <DisclosureHeader
                  label={label}
                  total={getIncomeTotal(incomes)}
                  isOpen={isOpen}
                  onToggle={() => toggleIncomeType(type)}
                  hasBackground={type === "monthly"}
                />
                <ul className="mt-4 flex flex-col gap-2 pr-4">
                  {incomes.map(
                    ({ id, receiver: { full_name }, unit_price, quantity }) => (
                      <li
                        key={id}
                        className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2"
                      >
                        <p>{full_name}</p>
                        <Amount value={unit_price * quantity} />
                      </li>
                    ),
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </li>

      <li className={disclosureClass(isExpenseOpen)}>
        <DisclosureHeader
          label="هزینه"
          total={summary.totalExpense}
          isOpen={isExpenseOpen}
          onToggle={() => setExpenseOpen((current) => !current)}
        />
        <ul className="mt-4 flex w-full flex-col gap-4 pr-4">
          {EXPENSE_TYPES.map(({ type, label }) => {
            const expenses = summary.expensesByType[type] ?? [];
            const expensesByCategory =
              type === "daily"
                ? summary.dailyExpensesByCategory
                : summary.repairExpensesByCategory;
            const isOpen = openExpenseTypes[type] ?? false;
            const openCategories =
              type === "daily" ? openDailyCategories : openRepairCategories;
            const getTotal =
              type === "daily" ? getDailyExpenseTotal : getExpenseTotal;

            return (
              <li key={type} className={disclosureClass(isOpen)}>
                <DisclosureHeader
                  label={label}
                  total={getTotal(expenses)}
                  isOpen={isOpen}
                  onToggle={() => toggleExpenseType(type)}
                />
                <ul className="mt-4 flex w-full flex-col gap-4 pr-4">
                  {Object.entries(expensesByCategory).map(
                    ([category, categoryExpenses = []]) => {
                      const isCategoryOpen = openCategories[category] ?? false;

                      return (
                        <li
                          key={category}
                          className={disclosureClass(isCategoryOpen)}
                        >
                          <DisclosureHeader
                            label={category}
                            total={getTotal(categoryExpenses)}
                            isOpen={isCategoryOpen}
                            onToggle={() => toggleCategory(category, type)}
                          />
                          <ul className="mt-4 flex flex-col gap-2 pr-4">
                            {categoryExpenses.map(
                              ({
                                id,
                                payer: { full_name },
                                unit_price,
                                wage_cost,
                              }) => (
                                <li
                                  key={id}
                                  className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2"
                                >
                                  <p>{full_name}</p>
                                  <Amount
                                    value={
                                      type === "daily"
                                        ? unit_price
                                        : unit_price + wage_cost
                                    }
                                  />
                                </li>
                              ),
                            )}
                          </ul>
                        </li>
                      );
                    },
                  )}
                </ul>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}
