import { useQuery } from "@tanstack/react-query";

import { karboomService } from "../_services/karboom-service";

import BaseResponse from "@/app/_interfaces/base-response";

import { Member } from "../_types/member";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetMembersEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean,
) {
  return useQuery<BaseResponse<Member[]>>({
    queryKey: ["expenses-categories", karboomId],
    queryFn: ({ queryKey, signal }) =>
      karboomService.getMembers(queryKey[1] as number, signal),
    enabled: enabled && isValidQueryId(karboomId),
  });
}
