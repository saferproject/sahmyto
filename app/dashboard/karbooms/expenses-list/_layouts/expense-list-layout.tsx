import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import ExpenselistItemComponent from "../_components/expense-list-item-component";
import useGetExpenses from "../_hooks/use-get-expenses";
import { ExpenseListProps } from "../_types/expense-list-props";

export default function ExpenseListLayout({
  onShowDetails,
  onRejectExpense,
}: ExpenseListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const { data: expenses } = useGetExpenses(karboomId);

  return (
    <ul className="mt-4 flex h-[calc(100%-56px)] w-full flex-col gap-4 overflow-y-auto">
      {expenses?.data.map((expense, index) => (
        <ExpenselistItemComponent
          key={index}
          expense={expense}
          onShowDetails={onShowDetails}
          onRejectExpense={onRejectExpense}
        />
      ))}
    </ul>
  );
}
