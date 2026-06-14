import { fetchWithAuth } from "@/app/proxy";
import ThirdPartyInsuranceBodyType from "../_types/add-third-party-insurance-body-type";

export const thirdPartyInsuranceService = {
  addThirdPartyInsurance: (body: ThirdPartyInsuranceBodyType) =>
    fetchWithAuth<void>("insurance/third-party-add", {
      body: JSON.stringify(body),
      method: "POST",
    }),
};
