import { fetchWithAuth } from "@/app/proxy";
import ThirdPartyInsuranceBodyType from "../_types/add-third-party-insurance-body-type";
import { ThirdPartyInsurance } from "../_types/third-party-insurance";

export const thirdPartyInsuranceService = {
  getThirdPartyInsurances: (id: number) =>
    fetchWithAuth<ThirdPartyInsurance[]>(`insurance/third-party/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addThirdPartyInsurance: ({
    karboom_id,
    ...other
  }: ThirdPartyInsuranceBodyType) =>
    fetchWithAuth<undefined>(`insurance/third-party-add/${karboom_id}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
