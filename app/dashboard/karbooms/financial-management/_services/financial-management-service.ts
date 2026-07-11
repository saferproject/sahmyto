import { fetchWithAuth } from "@/app/proxy";
import { FinancialMonth } from "../_types/financial-month";

export const financialManagmentService = {
  getFinancialManagmentMonths: (karboomId: number) =>
    fetchWithAuth<FinancialMonth[]>(`karboom/financials/months/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  validateClosingFinancialMonth: (FinancialMonthId: number) =>
    fetchWithAuth<unknown>(`karboom/financials/validate/${FinancialMonthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};
