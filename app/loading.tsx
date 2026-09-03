export default function Loading() {
  return (
    <main
      className="flex min-h-dvh items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="border-primary size-9 animate-spin rounded-full border-4 border-t-transparent" />
        <span className="text-body text-sm">در حال بارگذاری...</span>
      </div>
    </main>
  );
}
