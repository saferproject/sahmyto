export type SettleExpenseBody = {
  expenseId: number;
  payer_id: number;
  settlement_date: string;
  description: string | null;
};
