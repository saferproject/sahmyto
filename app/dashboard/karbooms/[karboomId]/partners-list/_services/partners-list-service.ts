import { http } from "@/app/_services/http";

import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import Partner from "../../../_interfaces/partner";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const partnersListService = {
  getPartners: (
    { karboom_id, ...queryParams }: GetPartnersQueryParams,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<Partner[]>(
      addPaginationQuery(`karboom/partners/${karboom_id}`, page),
      { signal, ...(Object.keys(queryParams).length ? { queryParams } : {}) },
    ),
  deletePartner: (partnerId: number) =>
    http.delete<void>(`karboom/partners/delete/${partnerId}`),
};
