import { fetchWithAuth } from "@/app/proxy";
import { FinancialMonth } from "../_types/financial-month";
import { FinancialMonthData } from "../_types/financial-month-data";
import { SettlementData } from "../_types/settlement-data";

export const financialManagmentService = {
  getFinancialManagmentMonths: (karboomId: number, signal?: AbortSignal) =>
    fetchWithAuth<FinancialMonth[]>(`karboom/financials/months/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
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
  closeFinancialMonth: (financialMonthId: number) =>
    fetchWithAuth<unknown>(`karboom/financials/closed/${financialMonthId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),
  getFinancialMonthData: (monthId: number, signal?: AbortSignal) =>
    fetchWithAuth<FinancialMonthData>(`karboom/financials/show/${monthId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal,
    }),
  getSettlementData: (monthId: number, signal?: AbortSignal) =>
    fetchWithAuth<SettlementData>(
      `karboom/financials/settlement/${monthId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal,
      },
    ),
};
