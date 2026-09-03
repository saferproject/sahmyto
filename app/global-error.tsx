"use client";

import { useEffect } from "react";

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
        <main className="flex min-h-dvh items-center justify-center px-6 text-center">
          <div className="flex max-w-md flex-col items-center gap-4">
            <h1 className="text-xl font-semibold">مشکلی پیش آمد</h1>
            <p className="text-sm">بارگذاری برنامه با خطا مواجه شد.</p>
            <button type="button" onClick={reset}>
              تلاش دوباره
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
