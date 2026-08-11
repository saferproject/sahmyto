"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";

import ApiError from "./_errors/api-error";
import BaseResponse from "./_interfaces/base-response";

const DEFAULT_ERROR_MESSAGE = "عملیات با خطا مواجه شد";

function getErrorMessage(error: unknown) {
  if (!(error instanceof ApiError)) return DEFAULT_ERROR_MESSAGE;

  return error.errors?.error?.[0] || error.message || DEFAULT_ERROR_MESSAGE;
}

function shouldRetryQuery(failureCount: number, error: unknown) {
  if (failureCount >= 2 || !(error instanceof ApiError)) return false;

  return (
    error.status === 0 ||
    error.status === 408 ||
    error.status === 429 ||
    error.status >= 500
  );
}

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
          onError(error) {
            enqueueSnackbar(getErrorMessage(error), {
              variant: "error",
            });
          },
        }),

        mutationCache: new MutationCache({
          onSuccess(response) {
            const res = response as BaseResponse;

            enqueueSnackbar(res?.message || "عملیات با موفقیت انجام شد", {
              variant: "success",
            });
          },

          onError(error) {
            enqueueSnackbar(getErrorMessage(error), {
              variant: "error",
            });
          },
        }),

        defaultOptions: {
          queries: {
            staleTime: 1000 * 60,
            retry: shouldRetryQuery,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 5000),
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
