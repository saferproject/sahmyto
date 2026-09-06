export type ExpenseListProps = {
  onShowDetails: () => void;
  onSettle: (expenseId: number) => void;
  onReject: (expenseId: number) => void;
  onOpenExpenseForm: () => void;
};
