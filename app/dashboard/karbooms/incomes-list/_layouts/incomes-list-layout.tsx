"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import IncomeListItemComponent from "../_components/income-list-item-component";
import QueryState from "@/app/_components/query-state";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";

export default function IncomesListLayout({ onShowDetails, onRejectIncome }: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: incomes, isLoading, isError } = useGetIncomes(karboomId);

  return (
    <div className="mt-4 flex h-[calc(100%-56px)] w-full flex-col gap-4 overflow-y-auto">
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!incomes?.data.length}
      >
        {incomes?.data.map((income) => (
          <IncomeListItemComponent
            key={income.id}
            income={income}
            onShowDetails={onShowDetails}
            onRejectIncome={onRejectIncome}
          />
        ))}
      </QueryState>
    </div>
  );
}
