"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import IncomeListItemComponent from "../_components/income-list-item-component";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";

export default function IncomesListLayout({ onShowDetails, onRejectIncome }: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: incomes } = useGetIncomes(karboomId);

  return (
    <div className="mt-4 flex h-[calc(100%-56px)] w-full flex-col gap-4 overflow-y-auto">
      {incomes?.data.map((income, index) => (
        <IncomeListItemComponent
          key={index}
          income={income}
          onShowDetails={onShowDetails}
          onRejectIncome={onRejectIncome}
        />
      ))}
    </div>
  );
}
