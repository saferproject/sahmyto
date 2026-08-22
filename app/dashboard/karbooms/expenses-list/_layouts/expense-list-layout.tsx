"use client";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import ExpenseListItemComponent from "../_components/expense-list-item-component";
import useGetExpenses from "../_hooks/use-get-expenses";
import { ExpenseListProps } from "../_types/expense-list-props";
import EntityListLayout from "../../_layouts/entity-list-layout";

export default function ExpenseListLayout({
  onShowDetails,
  onRejectExpense,
  onOpenExpenseForm,
}: ExpenseListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: expenses, isLoading, isError } = useGetExpenses(karboomId);

  return (
    <EntityListLayout
      items={expenses?.data}
      isLoading={isLoading}
      isError={isError}
      onAdd={onOpenExpenseForm}
      renderItem={(expense, index) => (
        <ExpenseListItemComponent
          key={expense.id}
          expense={expense}
          index={index}
          onShowDetails={onShowDetails}
          onRejectExpense={onRejectExpense}
        />
      )}
    />
  );
}
