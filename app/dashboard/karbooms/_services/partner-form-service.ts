import { http } from "@/app/_services/http";
import AddPartnerEndpointBody from "../_types/add-partner-endpoint-body";
import EditPartnerEndpointBody from "../_types/edit-partner-endpoint-body";

export const partnerFormService = {
  addPartner: ({ karboom_id, ...other }: AddPartnerEndpointBody) =>
    http.post<undefined>(`karboom/partners/store/${karboom_id}`, {
      body: other,
    }),
  editPartner: ({ partner_id, ...other }: EditPartnerEndpointBody) =>
    http.put<undefined>(`karboom/partners/edit/${partner_id}`, { body: other }),
};
