import { fetchWithAuth } from "@/app/proxy";
import ThirdPartyInsuranceBodyType from "../_types/add-third-party-insurance-body-type";
import { ThirdPartyInsurance } from "../_types/third-party-insurance";

export const thirdPartyInsuranceService = {
  getThirdPartyInsurances: (id: number) =>
    fetchWithAuth<ThirdPartyInsurance[]>(`${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addThirdPartyInsurance: (body: ThirdPartyInsuranceBodyType) =>
    fetchWithAuth<undefined>("insurance/third-party-add", {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
