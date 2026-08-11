import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6 text-center">
      <div className="flex max-w-md flex-col items-center gap-4">
        <p className="text-primary text-6xl font-bold">۴۰۴</p>
        <h1 className="text-body text-xl font-semibold">صفحه پیدا نشد</h1>
        <p className="text-body text-sm">
          آدرس واردشده وجود ندارد یا صفحه جابه‌جا شده است.
        </p>
        <Link
          href="/dashboard/karbooms"
          className="bg-primary rounded-xl px-6 py-3 text-sm text-white"
        >
          بازگشت به کاربوم‌ها
        </Link>
      </div>
    </main>
  );
}
