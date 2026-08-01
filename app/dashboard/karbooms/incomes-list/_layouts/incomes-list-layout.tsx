"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { AnimatePresence } from "motion/react";

import IncomeListItemComponent from "../_components/income-list-item-component";
import QueryState from "@/app/_components/query-state";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";
import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";
import ListFooterLayout from "../../_layouts/list-footer-layout";

export default function IncomesListLayout({
  onShowDetails,
  onRejectIncome,
  onOpenIncomeForm,
}: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: incomes, isLoading, isError } = useGetIncomes(karboomId);

  return (
    <>
      <SelectedKarboomInfoComponent />
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
      <ListFooterLayout onAdd={onOpenIncomeForm} />
    </>
  );
}
