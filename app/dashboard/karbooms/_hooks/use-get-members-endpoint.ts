import { useQuery } from "@tanstack/react-query";

import { karboomService } from "../_services/karboom-service";

export default function useGetMembersEndpoint(karboomId: number, enabled: boolean) {
  return useQuery({
    queryKey: ["expenses-categories", karboomId],
    queryFn: ({ queryKey }) =>
      karboomService.getMembers(queryKey[1] as number),
    enabled
  });
}
