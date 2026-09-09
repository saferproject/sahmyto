"use client";

import { useEffect } from "react";

import ErrorContainer from "@/app/_components/error-container";
import { reportApplicationError } from "../../_utilities/telemetry";

export default function KarboomsErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportApplicationError(error, { boundary: "karbooms" });
  }, [error]);

  return (
    <ErrorContainer
      message="خطای غیرمنتظره‌ای در کاربوم‌ها رخ داده است. دوباره تلاش کنید."
      actionLabel="تلاش دوباره"
      onAction={reset}
    />
  );
}
