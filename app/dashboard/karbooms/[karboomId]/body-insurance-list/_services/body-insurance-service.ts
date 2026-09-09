import { http } from "@/app/_services/http";
import { BodyInsurance } from "../_types/body-insurance";
import { AddBodyInsuranceBody } from "../_types/add-body-insurance-body";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const bodyInsuranceService = {
  getBodyInsurances: (
    karboomId: number,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<BodyInsurance[]>(
      addPaginationQuery(`insurance/body/${karboomId}`, page),
      { signal },
    ),
  addBodyInsurance: ({ karboomId, ...other }: AddBodyInsuranceBody) =>
    http.post<undefined>(`insurance/body-add/${karboomId}`, { body: other }),
};
