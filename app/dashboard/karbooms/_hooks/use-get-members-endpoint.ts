import useListQuery from "@/app/_hooks/use-list-query";

import { karboomService } from "../_services/karboom-service";

export default function useGetMembersEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean,
) {
  return useListQuery(
    ["members", karboomId],
    karboomService.getMembers,
    karboomId,
    enabled,
  );
}
