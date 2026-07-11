export type FinancialMonth = {
  id: number;
  karboom_id: number;
  date: string;
  status: "closed" | "open" | "processing" | "approval";
  closed_at: string;
  created_at: string;
  updated_at: string;
};
