"use client";

import { useEffect } from "react";

import ErrorContainer from "./_components/error-container";
import { reportApplicationError } from "./_utilities/telemetry";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportApplicationError(error, { boundary: "global" });
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body>
        <ErrorContainer
          message="بارگذاری برنامه با خطا مواجه شد."
          actionLabel="تلاش دوباره"
          onAction={reset}
        />
      </body>
    </html>
  );
}
