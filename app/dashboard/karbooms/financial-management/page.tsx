import { Key, Lock1, Lock } from "iconsax-reactjs";

export default function FinancialManagementPage() {
  return (
    <div className="size-full">
      <div className="flex w-full flex-nowrap items-center gap-4 overflow-x-auto pt-5">
        <div className="bg-primary relative flex min-w-28 flex-col items-center gap-1 rounded-2xl px-4 py-2">
          <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
            <Lock size="20" className="text-primary" variant="Bold" />
          </span>
          <p className="text-sm font-semibold text-white">فروردین</p>
          <p className="text-xs text-white">{"1405/01"}</p>
        </div>
        <div className="border-body relative flex min-w-28 flex-col items-center gap-1 rounded-2xl border border-dashed bg-white px-4 py-2">
          <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
            <Key size="20" className="text-body" />
          </span>
          <p className="text-body text-sm font-semibold">اردیبهشت</p>
          <p className="text-body text-xs">{"1405/02"}</p>
        </div>
        <div className="border-secondary relative flex min-w-28 flex-col items-center gap-1 rounded-2xl border bg-white px-4 py-2 blur-[1px]">
          <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
            <Lock size="20" className="text-secondary" />
          </span>
          <p className="text-secondary text-sm font-semibold">خرداد</p>
          <p className="text-secondary text-xs">{"1405/03"}</p>
        </div>
        <div className="border-secondary relative flex min-w-28 flex-col items-center gap-1 rounded-2xl border bg-white px-4 py-2 blur-[1px]">
          <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
            <Lock size="20" className="text-secondary" />
          </span>
          <p className="text-secondary text-sm font-semibold">تیر</p>
          <p className="text-secondary text-xs">{"1405/04"}</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
