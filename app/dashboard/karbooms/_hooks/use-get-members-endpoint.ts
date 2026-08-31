import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";

import { karboomService } from "../_services/karboom-service";

import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetMembersEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean,
) {
  return useInfiniteListQuery({
    queryKey: ["members", karboomId],
    queryFn: (page, signal, queryKey) =>
      karboomService.getMembers(queryKey[1] as number, signal, page),
    enabled: enabled && isValidQueryId(karboomId),
  });
}
