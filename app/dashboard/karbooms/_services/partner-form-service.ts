import { fetchWithAuth } from "@/app/proxy";
import AddPartnerEndpointBody from "../_types/add-partner-endpoint-body";

export const partnerFormService = {
  addPartner: ({ karboom_id, ...other }: AddPartnerEndpointBody) =>
    fetchWithAuth<void>(`karboom/partners/store/${karboom_id}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};
