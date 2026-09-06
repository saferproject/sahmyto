export type ExpenseDetailsDrawerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onRejectExpense: (expenseId: number) => void;
};
