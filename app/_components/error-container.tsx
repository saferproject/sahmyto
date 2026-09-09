"use client";

type ErrorContainerProps = {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export default function ErrorContainer({
  title = "مشکلی پیش آمد",
  message,
  actionLabel = "بارگذاری دوباره",
  onAction,
}: ErrorContainerProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-dvh min-h-screen w-full items-center justify-center bg-[#f8fafc] px-6 py-10 text-center text-[#1f2a44]"
    >
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-[#e2e8f0] bg-white px-6 py-8 shadow-lg shadow-[#1f2a44]/10">
        <div
          aria-hidden="true"
          className="mb-5 flex size-14 items-center justify-center rounded-full bg-[#fff1e7] text-[#d65f12]"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 9v4" strokeLinecap="round" />
            <path d="M12 17h.01" strokeLinecap="round" />
            <path
              d="M10.3 3.7 2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-[#526079]">{message}</p>

        {onAction ? (
          <button
            type="button"
            className="mt-6 min-h-11 rounded-xl bg-[#e87525] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ce5c10] focus-visible:ring-2 focus-visible:ring-[#e87525] focus-visible:ring-offset-2"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
