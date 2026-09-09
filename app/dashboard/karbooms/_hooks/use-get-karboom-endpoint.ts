import { useQuery } from "@tanstack/react-query";

import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import { karboomService } from "../_services/karboom-service";

export default function useGetKarboomEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["karboom", karboomId],
    queryFn: ({ signal }) => karboomService.getKarboom(karboomId, signal),
    enabled: isValidQueryId(karboomId),
  });
}
