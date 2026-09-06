export type SettleIncomeBody = {
  incomeId: number;
  receiver_id: number;
  settlement_date: string;
  description: string | null;
}; 