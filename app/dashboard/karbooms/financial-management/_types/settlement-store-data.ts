import { SettlementBreakdown, SettlementMember } from "./settlement-data";

export type SettlementStoreData = SettlementMember & {
  id: number;
  opening_balance: number;
  share: number;
  salary: number;
  service_fee: number;
  income_held: number;
  expense_credit: number;
  payments_in: number;
  payments_out: number;
  balance: number;
  total: number;
  status: "creditor" | "debtor" | "settled";
  breakdown: SettlementBreakdown;
};