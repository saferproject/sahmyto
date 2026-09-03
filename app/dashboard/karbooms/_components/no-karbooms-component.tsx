"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CardEdit } from "iconsax-reactjs";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import NoKarboomIcon from "../_assets/_vectors/no-karboom-icon.svg";
import { NoKarboomsProps } from "../_types/no-karbooms-props";

export default function NoKarboomsComponent({ onAddKarboom }: NoKarboomsProps) {
  const fullName = useUserInfoStore((state) => state.full_name);
  const displayName = fullName?.trim() || "کاربر";

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-4">
      <Image src={NoKarboomIcon} alt="" className="h-33.25 w-34.25" />

      <section className="text-body relative h-38 w-full max-w-82.5 shrink-0 overflow-hidden rounded-3xl border border-[#f0f1f4] bg-white">
        <div
          aria-hidden="true"
          className="absolute -top-10 -left-9 h-50.5 w-[190px] rotate-[-8deg] rounded-[48%] bg-[#fff3ea]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-8 -left-17 h-[188px] w-[169px] rotate-[-9deg] rounded-[45%] bg-[#ffe2cf]"
        />

        <div className="absolute top-[18px] left-[24px] flex size-[35px] items-center justify-center rounded-[12px] bg-[#ffb887] text-[#162864]">
          <CardEdit size="18" aria-hidden="true" />
        </div>

        <div className="absolute top-[23px] right-[24px] max-w-[200px] text-right">
          <p className="truncate text-[8px] leading-3 font-bold">
            {displayName} عزیز!
          </p>
          <div className="mt-1 flex items-center justify-start gap-1">
            <span
              aria-hidden="true"
              className="relative h-5.5 w-2.75 shrink-0 rotate-[-10deg]"
            >
              <span className="absolute top-0 left-1/2 h-3.75 w-2.25 -translate-x-1/2 rounded-[50%] bg-white shadow-[0_0_0_1px_#edf0f5]">
                <span className="absolute top-0.75 left-1/2 h-2.25 w-1.25 -translate-x-1/2 rounded-full bg-[#162864]" />
              </span>
              <span className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#162864]" />
            </span>
            <h3 className="text-[12px] leading-4.5 font-extrabold text-nowrap">
              کاربوم فعالی وجود ندارد!
            </h3>
          </div>
        </div>

        <p className="absolute top-[71px] right-[29px] left-[29px] text-[10px] leading-4 font-medium">
          برای استفاده از سهمیتو و مدیریت ناوگان خود میبایست در مرحله اول کاربوم
          مورد نظر را ایجاد کنید
        </p>

        <Link
          href="/dashboard/tutorial"
          className="absolute bottom-[20px] left-[50px] border-b border-dashed border-[#162864] pb-1 text-[10px] leading-3 font-bold"
        >
          مشاهده ویدئوهای آموزشی
        </Link>

        <button
          type="button"
          onClick={onAddKarboom}
          className="absolute right-[24px] bottom-[18px] flex h-[23px] w-[120px] cursor-pointer items-center justify-between overflow-hidden rounded-[7px] bg-[#fb6a02] pr-2 text-[10px] font-bold text-white"
        >
          <span>ساخت اولین کاربوم</span>
          <span className="absolute top-0 left-0 flex h-full w-[32px] items-center justify-center rounded-full bg-[#e95f00]">
            <ArrowLeft size="12" aria-hidden="true" />
          </span>
        </button>
      </section>
    </div>
  );
}
