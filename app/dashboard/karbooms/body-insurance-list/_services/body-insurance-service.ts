import { http } from "@/app/_services/http";
import { BodyInsurance } from "../_types/body-insurance";
import { AddBodyInsuranceBody } from "../_types/add-body-insurance-body";

export const bodyInsuranceService = {
  getBodyInsurances: (karboomId: number, signal?: AbortSignal) =>
    http.get<BodyInsurance[]>(`insurance/body/${karboomId}`, { signal }),
  addBodyInsurance: ({ karboomId, ...other }: AddBodyInsuranceBody) =>
    http.post<undefined>(`insurance/body-add/${karboomId}`, { body: other }),
};
