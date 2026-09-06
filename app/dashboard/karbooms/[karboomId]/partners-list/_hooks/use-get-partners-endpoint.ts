import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";

import { partnersListService } from "../_services/partners-list-service";

import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetPartnersEndpoint(
  queryParams: GetPartnersQueryParams,
  enabled: boolean = true,
) {
  return useInfiniteListQuery({
    queryKey: ["partners", queryParams],
    queryFn: (page, signal, queryKey) =>
      partnersListService.getPartners(
        queryKey[1] as GetPartnersQueryParams,
        signal,
        page,
      ),
    enabled: enabled && isValidQueryId(queryParams.karboom_id),
  });
}
