"use client";

import { Suspense } from "react";
import useListFilters from "@/app/dashboard/_hooks/use-list-filters";
import { INCOME_FILTERS } from "../_constants/income-filters";

import { useKarboomsStore } from "../../../_providers/karbooms-store-provider";

import IncomeListItemComponent from "../_components/income-list-item-component";

import useGetIncomes from "../_hooks/use-get-incomes";

import { IncomeListProps } from "../_types/income-list-props";
import EntityListLayout from "../../../_layouts/entity-list-layout";
import ListHeaderLayout from "../../../_layouts/list-header-layout";

function FilteredIncomesList({
  onShowDetails,
  onSettle,
  onReject,
  onOpenIncomeForm,
}: IncomeListProps) {
  const karboomId = useKarboomsStore((state) => state.id);
  const { queryParams } = useListFilters(INCOME_FILTERS);

  const {
    data: incomes,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetIncomes(karboomId, queryParams);

  return (
    <>
      <EntityListLayout
        header={
          <ListHeaderLayout title="لیست درآمد ها" filters={INCOME_FILTERS} />
        }
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
    </>
  );
}

export default function IncomesListLayout(props: IncomeListProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-secondary-lightest h-24 w-full animate-pulse rounded-lg" />
      }
    >
      <FilteredIncomesList {...props} />
    </Suspense>
  );
}
