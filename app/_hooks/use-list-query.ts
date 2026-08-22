import { useQuery } from "@tanstack/react-query";

import BaseResponse from "@/app/_interfaces/base-response";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useListQuery<TData>(
  queryKey: readonly unknown[],
  queryFn: (
    id: number,
    signal: AbortSignal,
  ) => Promise<BaseResponse<TData>>,
  id: number | null | undefined,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey,
    queryFn: ({ queryKey, signal }) => queryFn(queryKey[1] as number, signal),
    enabled: enabled && isValidQueryId(id),
  });
}
