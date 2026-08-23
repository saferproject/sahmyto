"use client";

import { useEffect } from "react";

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
    <section className="flex min-h-dvh items-center justify-center px-6 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <h2 className="text-body text-xl font-semibold">مشکلی پیش آمد</h2>
        <p className="text-body text-sm">
          خطای غیرمنتظره‌ای در کاربوم‌ها رخ داده است. دوباره تلاش کنید.
        </p>
        <button
          type="button"
          className="bg-primary rounded-xl px-6 py-3 text-sm text-white"
          onClick={reset}
        >
          تلاش دوباره
        </button>
      </div>
    </section>
  );
}
