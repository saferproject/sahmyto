import { useQuery } from "@tanstack/react-query";

import { karboomService } from "../_services/karboom-service";

import BaseResponse from "@/app/_interfaces/base-response";

import { Member } from "../_types/member";

export default function useGetMembersEndpoint(
  karboomId: number,
  enabled: boolean,
) {
  return useQuery<BaseResponse<Member[]>>({
    queryKey: ["expenses-categories", karboomId],
    queryFn: ({ queryKey, signal }) =>
      karboomService.getMembers(queryKey[1] as number, signal),
    enabled,
  });
}
