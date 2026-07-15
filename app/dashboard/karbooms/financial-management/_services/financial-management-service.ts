import { fetchWithAuth } from "@/app/proxy";
import { FinancialMonth } from "../_types/financial-month";
import { FinancialMonthData } from "../_types/financial-month-data";

export const financialManagmentService = {
  getFinancialManagmentMonths: (karboomId: number) =>
    fetchWithAuth<FinancialMonth[]>(`karboom/financials/months/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  validateClosingFinancialMonth: (financialMonthId: number) =>
    fetchWithAuth<unknown>(`karboom/financials/validate/${financialMonthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  startProcessingFinancialMonth: (financialMonthId: number) =>
    fetchWithAuth<unknown>(
      `karboom/financials/processing/${financialMonthId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      },
    ),
  getFinancialMonthData: (monthId: number) =>
    fetchWithAuth<FinancialMonthData>(`karboom/financials/show/${monthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};
