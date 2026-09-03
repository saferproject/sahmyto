import { http } from "@/app/_services/http";
import createQueryParams from "@/app/_utilities/create-query-params";
import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import Partner from "../../_interfaces/partner";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const partnersListService = {
  getPartners: (
    { karboom_id, ...other }: GetPartnersQueryParams,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<Partner[]>(
      addPaginationQuery(
        `karboom/partners/${karboom_id}${createQueryParams<Omit<GetPartnersQueryParams, "karboom_id">>(other)}`,
        page,
      ),
      { signal },
    ),
  deletePartner: (partnerId: number) =>
    http.delete<void>(`karboom/partners/delete/${partnerId}`),
};
