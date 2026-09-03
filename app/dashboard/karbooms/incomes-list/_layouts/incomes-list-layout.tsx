"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import IncomeListItemComponent from "../_components/income-list-item-component";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";
import EntityListLayout from "../../_layouts/entity-list-layout";

export default function IncomesListLayout({
  onShowDetails,
  onSettle,
  onReject,
  onOpenIncomeForm,
}: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: incomes,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetIncomes(karboomId);

  return (
    <EntityListLayout
      items={incomes?.data}
      isLoading={isLoading}
      isError={isError}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      onAdd={onOpenIncomeForm}
      renderItem={(income, index) => (
        <IncomeListItemComponent
          key={income.id}
          income={income}
          index={index}
          onShowDetails={onShowDetails}
          onSettle={onSettle}
          onReject={onReject}
        />
      )}
    />
  );
}
