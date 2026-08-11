import { fetchWithAuth } from "@/app/proxy";
import AddPartnerEndpointBody from "../_types/add-partner-endpoint-body";
import EditPartnerEndpointBody from "../_types/edit-partner-endpoint-body";

export const partnerFormService = {
  addPartner: ({ karboom_id, ...other }: AddPartnerEndpointBody) =>
    fetchWithAuth<void>(`karboom/partners/store/${karboom_id}`, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  editPartner: ({ partner_id, ...other }: EditPartnerEndpointBody) =>
    fetchWithAuth<void>(`karboom/partners/edit/${partner_id}`, {
      body: JSON.stringify(other),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),
};
