import { fetchWithAuth } from "@/app/proxy";
import { BodyInsurance } from "../_types/body-insurance";
import { AddBodyInsuranceBody } from "../_types/add-body-insurance-body";

export const bodyInsuranceService = {
  getBodyInsurances: (karboomId: number) =>
    fetchWithAuth<BodyInsurance[]>(`insurance/body/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addBodyInsurance: ({ karboomId, ...other }: AddBodyInsuranceBody) =>
    fetchWithAuth<undefined>(`insurance/body-add/${karboomId}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};