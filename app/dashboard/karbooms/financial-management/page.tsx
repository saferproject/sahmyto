"use client";

import formatNumber from "@/app/_utilities/format-numbers";
import { Button } from "@mui/material";
import {
  Key,
  Lock,
  Money,
  ArrowCircleUp2,
  ArrowDown2,
  Minus,
  Add,
  ArrowCircleDown2,
  Lock1,
} from "iconsax-reactjs";

export default function FinancialManagementPage() {
  return (
    <div className="flex size-full flex-col justify-between">
      <div className="h-dvh min-h-0 flex-1">
        <ul className="flex w-full snap-x snap-mandatory flex-nowrap items-center gap-4 overflow-x-auto pt-5">
          <li className="bg-primary relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl px-4 py-2">
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
              <Lock size="20" className="text-primary" variant="Bold" />
            </span>
            <p className="text-sm font-semibold text-white">فروردین</p>
            <p className="text-xs text-white">{"1405"}</p>
          </li>
          <li className="border-body relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl border border-dashed bg-white px-4 py-2">
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
              <Key size="20" className="text-body" />
            </span>
            <p className="text-body text-sm font-semibold">اردیبهشت</p>
            <p className="text-body text-xs">{"1405"}</p>
          </li>
          <li className="border-secondary relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl border bg-white px-4 py-2 blur-[1px]">
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
              <Lock size="20" className="text-secondary" />
            </span>
            <p className="text-secondary text-sm font-semibold">خرداد</p>
            <p className="text-secondary text-xs">{"1405"}</p>
          </li>
          <li className="border-secondary relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl border bg-white px-4 py-2 blur-[1px]">
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
              <Lock size="20" className="text-secondary" />
            </span>
            <p className="text-secondary text-sm font-semibold">تیر</p>
            <p className="text-secondary text-xs">{"1405"}</p>
          </li>
          <li className="border-secondary relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl border bg-white px-4 py-2 blur-[1px]">
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
              <Lock size="20" className="text-secondary" />
            </span>
            <p className="text-secondary text-sm font-semibold">مرداد</p>
            <p className="text-secondary text-xs">{"1405"}</p>
          </li>
        </ul>
        <ul className="mt-4 flex flex-col gap-4">
          <li className="border-secondary-light flex items-center justify-between rounded-2xl border px-6 py-2">
            <div className="flex items-center gap-2">
              <div className="relative text-green-500">
                <Money size="24" variant="Broken" />
                <ArrowCircleUp2
                  size="16"
                  className="absolute -right-5 bottom-0"
                />
              </div>
              <p className="text-body text-sm">{"امیر الله دادیان"}</p>
            </div>
            <div className="flex items-center gap-1">
              <p>{formatNumber(123456789)}</p>
              <Add size="20" className="text-green-500" />
              <ArrowDown2 size="16" className="text-body" />
            </div>
          </li>
          <li className="border-secondary-light flex items-center justify-between rounded-2xl border px-6 py-2">
            <div className="flex items-center gap-2">
              <div className="relative text-red-500">
                <Money size="24" variant="Broken" />
                <ArrowCircleDown2
                  size="16"
                  className="absolute -right-5 bottom-0"
                />
              </div>
              <p className="text-body text-sm">{"امیر الله دادیان"}</p>
            </div>
            <div className="flex items-center gap-1">
              <p>{formatNumber(987654321)}</p>
              <Minus size="20" className="text-red-500" />
              <ArrowDown2 size="16" className="text-body" />
            </div>
          </li>
        </ul>
      </div>
      <Button
        variant="contained"
        startIcon={<Lock1 size="20" className="text-white" />}
        endIcon={<span className="text-xs!">اردیبهشت ماه</span>}
        sx={{
          marginTop: "8px",
          justifyContent: "space-between",
        }}
      >
        بستن ماه مالی
      </Button>
    </div>
  );
}
