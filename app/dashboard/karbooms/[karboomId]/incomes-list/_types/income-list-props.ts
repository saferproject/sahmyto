export type IncomeListProps = {
  onShowDetails: () => void;
  onSettle: (incomeId: number) => void;
  onReject: (incomeId: number) => void;
  onOpenIncomeForm: () => void;
};
