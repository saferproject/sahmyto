import { useQuery } from "@tanstack/react-query";

import { PartnersListService } from "../_services/partners-list-service";

import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";

export default function useGetPartnersEndpoint(
  queryParams: GetPartnersQueryParams,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["partners", queryParams],
    queryFn: ({ queryKey }) =>
      PartnersListService.getPartners(queryKey[1] as GetPartnersQueryParams),
    enabled,
  });
}
