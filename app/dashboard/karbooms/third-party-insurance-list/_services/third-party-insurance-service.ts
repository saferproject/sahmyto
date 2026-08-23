import { http } from "@/app/_services/http";
import ThirdPartyInsuranceBodyType from "../_types/add-third-party-insurance-body-type";
import { ThirdPartyInsurance } from "../_types/third-party-insurance";

export const thirdPartyInsuranceService = {
  getThirdPartyInsurances: (id: number, signal?: AbortSignal) =>
    http.get<ThirdPartyInsurance[]>(`insurance/third-party/${id}`, { signal }),
  addThirdPartyInsurance: ({
    karboom_id,
    ...other
  }: ThirdPartyInsuranceBodyType) =>
    http.post<undefined>(`insurance/third-party-add/${karboom_id}`, {
      body: other,
    }),
};
