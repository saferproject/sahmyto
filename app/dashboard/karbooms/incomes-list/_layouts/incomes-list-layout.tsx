"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { AnimatePresence } from "motion/react";

import IncomeListItemComponent from "../_components/income-list-item-component";
import QueryState from "@/app/_components/query-state";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";
import IncomesListFooterLayout from "./incomes-list-footer-layout";

export default function IncomesListLayout({
  onShowDetails,
  onRejectIncome,
  onOpenIncomeForm,
}: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: incomes, isLoading, isError } = useGetIncomes(karboomId);

  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pb-2">
        <QueryState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!incomes?.data.length}
        >
          <ul className="flex w-full flex-col gap-4">
            <AnimatePresence>
              {incomes?.data.map((income, index) => (
                <IncomeListItemComponent
                  key={income.id}
                  income={income}
                  index={index}
                  onShowDetails={onShowDetails}
                  onRejectIncome={onRejectIncome}
                />
              ))}
            </AnimatePresence>
          </ul>
        </QueryState>
      </div>
      <IncomesListFooterLayout onAddIncome={onOpenIncomeForm} />
    </div>
  );
}
