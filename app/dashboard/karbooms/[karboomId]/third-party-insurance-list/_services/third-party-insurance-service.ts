import { http } from "@/app/_services/http";
import ThirdPartyInsuranceBodyType from "../_types/add-third-party-insurance-body-type";
import { ThirdPartyInsurance } from "../_types/third-party-insurance";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const thirdPartyInsuranceService = {
  getThirdPartyInsurances: (
    id: number,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<ThirdPartyInsurance[]>(
      addPaginationQuery(`insurance/third-party/${id}`, page),
      { signal },
    ),
  addThirdPartyInsurance: ({
    karboom_id,
    ...other
  }: ThirdPartyInsuranceBodyType) =>
    http.post<undefined>(`insurance/third-party-add/${karboom_id}`, {
      body: other,
    }),
};
