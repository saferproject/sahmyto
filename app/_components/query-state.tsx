"use client";

import { CircularProgress } from "@mui/material";
import CenteredMessageComponent from "./centered-message-component";

type QueryStateProps = {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
};

/**
 * Renders the appropriate UI for a React Query result: a spinner while loading,
 * a message on error, an empty message when there is no data, otherwise the
 * children. Keeps every list from re-implementing (and forgetting) these states.
 */
export default function QueryState({
  isLoading,
  isError,
  isEmpty,
  children,
  loadingFallback,
  errorFallback,
  emptyFallback,
}: QueryStateProps) {
  if (isLoading)
    return (
      loadingFallback ?? (
        <div className="flex h-full w-full items-center justify-center py-8">
          <CircularProgress color="primary" />
        </div>
      )
    );

  if (isError)
    return errorFallback ?? <CenteredMessageComponent text="خطا در دریافت اطلاعات" />;

  if (isEmpty) return emptyFallback ?? <CenteredMessageComponent text="موردی یافت نشد" />;

  return children;
}
