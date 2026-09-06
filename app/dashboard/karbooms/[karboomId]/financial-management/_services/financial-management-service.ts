import { http } from "@/app/_services/http";
import { FinancialMonth } from "../_types/financial-month";
import { FinancialMonthData } from "../_types/financial-month-data";
import type { SettlementDataResponse } from "../_types/settlement-data";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const financialManagementService = {
  getFinancialManagmentMonths: (
    karboomId: number,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<FinancialMonth[]>(
      addPaginationQuery(`karboom/financials/months/${karboomId}`, page),
      { signal },
    ),
  validateClosingFinancialMonth: (financialMonthId: number) =>
    http.get<unknown>(`karboom/financials/validate/${financialMonthId}`),
  startProcessingFinancialMonth: (financialMonthId: number) =>
    http.put<unknown>(`karboom/financials/processing/${financialMonthId}`),
  closeFinancialMonth: (financialMonthId: number) =>
    http.put<unknown>(`karboom/financials/closed/${financialMonthId}`),
  getFinancialMonthData: (monthId: number, signal?: AbortSignal) =>
    http.get<FinancialMonthData>(`karboom/financials/show/${monthId}`, {
      signal,
    }),
  getSettlementData: (monthId: number, signal?: AbortSignal) =>
    http.get<SettlementDataResponse>(
      `karboom/financials/settlement/${monthId}`,
      {
        signal,
      },
    ),
};
