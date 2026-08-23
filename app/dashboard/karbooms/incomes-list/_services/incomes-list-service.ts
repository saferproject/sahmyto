import { http } from "@/app/_services/http";
import { Income } from "../../_types/income";
import { RejectIncomeBody } from "../_types/reject-income-body";

export const incomeListService = {
  getIncomes: (karboomId: number, signal?: AbortSignal) =>
    http.get<Income[]>(`karboom/income/karboom/${karboomId}`, { signal }),
  approveIncome: (incomeId: number) =>
    http.post<undefined>(`karboom/income/accept/${incomeId}`),
  rejectIncome: (incomeId: number, body: RejectIncomeBody) =>
    http.post<undefined>(`karboom/income/reject/${incomeId}`, { body }),
};
