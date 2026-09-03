import { http } from "@/app/_services/http";
import { Income } from "../../_types/income";
import { RejectIncomeBody } from "../_types/reject-income-body";
import { SettleIncomeBody } from "../_types/settle-income-body";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const incomeListService = {
  getIncomes: (karboomId: number, signal?: AbortSignal, page: number = 1) =>
    http.get<Income[]>(
      addPaginationQuery(`karboom/income/karboom/${karboomId}`, page),
      { signal },
    ),                    
  settleIncome: ({ incomeId, ...body }: SettleIncomeBody) =>
    http.post<undefined>(`karboom/income/settle/${incomeId}`, { body }),
  approveIncome: (incomeId: number) =>
    http.post<undefined>(`karboom/income/accept/${incomeId}`),
  rejectIncome: (incomeId: number, body: RejectIncomeBody) =>
    http.post<undefined>(`karboom/income/reject/${incomeId}`, { body }),
};