import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { AnimatePresence } from "motion/react";

import ExpenseListItemComponent from "../_components/expense-list-item-component";
import QueryState from "@/app/_components/query-state";
import useGetExpenses from "../_hooks/use-get-expenses";
import { ExpenseListProps } from "../_types/expense-list-props";
import ExpensesListFooterLayout from "./expense-list-footer-layout";
import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";

export default function ExpenseListLayout({
  onShowDetails,
  onRejectExpense,
  onOpenExpenseForm
}: ExpenseListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: expenses, isLoading, isError } = useGetExpenses(karboomId);

  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-auto pb-2">
        <SelectedKarboomInfoComponent />
        <QueryState
          isLoading={isLoading}
          isError={isError}
          isEmpty={!expenses?.data.length}
        >
          <ul className="flex w-full flex-col gap-4 mt-6">
            <AnimatePresence>
              {expenses?.data.map((expense, index) => (
                <ExpenseListItemComponent
                  key={expense.id}
                  expense={expense}
                  index={index}
                  onShowDetails={onShowDetails}
                  onRejectExpense={onRejectExpense}
                />
              ))}
            </AnimatePresence>
          </ul>
        </QueryState>
      </div>
      <ExpensesListFooterLayout onAddExpense={onOpenExpenseForm} />
    </div>
  );
}
