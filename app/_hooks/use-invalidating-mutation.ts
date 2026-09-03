import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";

import ApiError from "@/app/_errors/api-error";

interface UseInvalidatingMutationOptions<TData, TVariables> {
  mutationKey: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateQueries?: QueryKey[];
}

export default function useInvalidatingMutation<
  TData = unknown,
  TVariables = void,
>({
  mutationKey,
  mutationFn,
  invalidateQueries = [],
}: UseInvalidatingMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation<TData, ApiError, TVariables>({
    mutationKey,
    mutationFn,
    onSuccess: async () => {
      await Promise.all(
        invalidateQueries.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
    },
  });
}
