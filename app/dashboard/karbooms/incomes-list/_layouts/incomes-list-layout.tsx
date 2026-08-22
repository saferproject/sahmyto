"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import IncomeListItemComponent from "../_components/income-list-item-component";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";
import EntityListLayout from "../../_layouts/entity-list-layout";

export default function IncomesListLayout({
  onShowDetails,
  onRejectIncome,
  onOpenIncomeForm,
}: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: incomes, isLoading, isError } = useGetIncomes(karboomId);

  return (
    <EntityListLayout
      items={incomes?.data}
      isLoading={isLoading}
      isError={isError}
      onAdd={onOpenIncomeForm}
      renderItem={(income, index) => (
        <IncomeListItemComponent
          key={income.id}
          income={income}
          index={index}
          onShowDetails={onShowDetails}
          onRejectIncome={onRejectIncome}
        />
      )}
    />
  );
}
