import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import ExpenselistItemComponent from "../_components/expense-list-item-component";
import QueryState from "@/app/_components/query-state";
import useGetExpenses from "../_hooks/use-get-expenses";
import { ExpenseListProps } from "../_types/expense-list-props";
import ExpensesListFooterLayout from "./expense-list-footer-layout";

export default function ExpenseListLayout({
  onShowDetails,
  onRejectExpense,
  onOpenExpenseForm
}: ExpenseListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: expenses, isLoading, isError } = useGetExpenses(karboomId);

  return (
    <ul className="mt-4 flex h-[calc(100%-56px)] w-full flex-col gap-4 overflow-y-auto relative">
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!expenses?.data.length}
      >
        {expenses?.data.map((expense) => (
          <ExpenselistItemComponent
            key={expense.id}
            expense={expense}
            onShowDetails={onShowDetails}
            onRejectExpense={onRejectExpense}
          />
        ))}
      </QueryState>
      <ExpensesListFooterLayout onAddExpense={onOpenExpenseForm} />
    </ul>
  );
}
