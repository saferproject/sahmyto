import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import BaseResponse from "@/app/_interfaces/base-response";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useListQuery<TData>(
  queryKey: readonly unknown[],
  queryFn: (signal: AbortSignal) => Promise<BaseResponse<TData>>,
  enabled?: boolean,
): UseQueryResult<BaseResponse<TData>>;
export default function useListQuery<TData>(
  queryKey: readonly unknown[],
  queryFn: (id: number, signal: AbortSignal) => Promise<BaseResponse<TData>>,
  id: number | null | undefined,
  enabled?: boolean,
): UseQueryResult<BaseResponse<TData>>;
export default function useListQuery<TData>(
  queryKey: readonly unknown[],
  queryFn:
    | ((signal: AbortSignal) => Promise<BaseResponse<TData>>)
    | ((id: number, signal: AbortSignal) => Promise<BaseResponse<TData>>),
  idOrEnabled?: number | null | boolean,
  enabled: boolean = true,
) {
  const usesId = typeof idOrEnabled !== "boolean" && arguments.length >= 3;
  const id = usesId ? idOrEnabled : undefined;
  const queryEnabled = usesId
    ? enabled && isValidQueryId(id)
    : typeof idOrEnabled === "boolean"
      ? idOrEnabled
      : true;

  return useQuery({
    queryKey,
    queryFn: ({ queryKey, signal }) =>
      usesId
        ? (
            queryFn as (
              id: number,
              signal: AbortSignal,
            ) => Promise<BaseResponse<TData>>
          )(queryKey[1] as number, signal)
        : (queryFn as (signal: AbortSignal) => Promise<BaseResponse<TData>>)(
            signal,
          ),
    enabled: queryEnabled,
  });
}
