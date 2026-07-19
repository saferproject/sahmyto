"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";

import BaseResponse from "./_interfaces/base-response";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError({ message }) {
            enqueueSnackbar(message ?? "عملیات با خطا مواجه شد", {
              variant: "error",
            });
          },
        }),

        mutationCache: new MutationCache({
          onSuccess(response) {
            const res = response as BaseResponse;

            enqueueSnackbar(res?.message ?? "عملیات با موفقیت انجام شد", {
              variant: "success",
            });
          },

          onError(response) {
            const res = response as unknown as BaseResponse;

            enqueueSnackbar(res.errors?.["error"]?.[0] ?? "عملیات با خطا مواجه شد", {
              variant: "error",
            });
          },
        }),

        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            retry: 0,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
