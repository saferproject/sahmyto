import { useQuery } from "@tanstack/react-query";

import { PartnersListService } from "../_services/partners-list-service";

import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetPartnersEndpoint(
  queryParams: GetPartnersQueryParams,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["partners", queryParams],
    queryFn: ({ queryKey, signal }) =>
      PartnersListService.getPartners(
        queryKey[1] as GetPartnersQueryParams,
        signal,
      ),
    enabled: enabled && isValidQueryId(queryParams.karboom_id),
  });
}
