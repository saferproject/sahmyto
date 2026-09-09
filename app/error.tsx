"use client";

import { useEffect } from "react";

import ErrorContainer from "./_components/error-container";
import { reportApplicationError } from "./_utilities/telemetry";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportApplicationError(error, { boundary: "app" });
  }, [error]);

  return (
    <ErrorContainer
      message="خطای غیرمنتظره‌ای رخ داده است. دوباره تلاش کنید."
      actionLabel="تلاش دوباره"
      onAction={reset}
    />
  );
}
