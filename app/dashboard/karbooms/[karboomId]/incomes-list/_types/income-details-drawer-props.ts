export type IncomeDetailsDrawerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onRejectIncome: (incomeId: number) => void;
};
