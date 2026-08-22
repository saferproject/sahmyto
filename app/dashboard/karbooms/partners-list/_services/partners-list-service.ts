import { http } from "@/app/_services/http";
import createQueryParams from "@/app/_utilities/create-query-params";
import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import Partner from "../../_interfaces/partner";

export const PartnersListService = {
  getPartners: (
    { karboom_id, ...other }: GetPartnersQueryParams,
    signal?: AbortSignal,
  ) =>
    http.get<Partner[]>(
      `karboom/partners/${karboom_id}${createQueryParams<Omit<GetPartnersQueryParams, "karboom_id">>(other)}`,
      { signal },
    ),
  deletePartner: (partnerId: number) =>
    http.delete<void>(`karboom/partners/delete/${partnerId}`),
};
