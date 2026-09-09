"use client";

import { useEffect } from "react";

import ErrorContainer from "@/app/_components/error-container";
import { reportApplicationError } from "@/app/_utilities/telemetry";

export default function DashboardErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportApplicationError(error, { boundary: "dashboard" });
  }, [error]);

  return (
    <ErrorContainer
      message="خطای غیرمنتظره‌ای در داشبورد رخ داده است. دوباره تلاش کنید."
      actionLabel="تلاش دوباره"
      onAction={reset}
    />
  );
}
