import { fetchWithAuth } from "@/app/proxy";
import { Income } from "../../_types/income";
import { RejectIncomeBody } from "../_types/reject-income-body";

export const IncomeListService = {
  getIncomes: (karboomId: number) =>
    fetchWithAuth<Income[]>(`karboom/income/karboom/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  approveIncome: (incomeId: number) =>
    fetchWithAuth<undefined>(`karboom/income/accept/${incomeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  rejectIncome: (incomeId: number, body: RejectIncomeBody) =>
    fetchWithAuth<undefined>(`karboom/income/reject/${incomeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
};
