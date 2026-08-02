import { TransactionTone } from "./transaction-tone";

export type WalletTransaction = {
  id: number;
  title: string;
  amount: string;
  date: string;
  tone: TransactionTone;
  icon: "wallet" | "report";
};
