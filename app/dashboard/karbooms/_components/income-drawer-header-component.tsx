import Image from "next/image";

import { PlayCircle, Truck } from "iconsax-reactjs";

import { INCOME_TYPES_FA } from "../_constants/income-types-fa";

import { IncomeDrawerHeaderProps } from "../_types/income-drawer-header-props";

export default function IncomeDrawerHeaderComponent({
  incomeType,
}: IncomeDrawerHeaderProps) {
  return (
    <div className="relative mt-8 mb-8">
      <Image
        src="/images/income-type-tag.svg"
        alt=""
        className="absolute -top-8 left-0 z-10"
        width={48}
        height={48}
      />
      <div className="relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-dashed p-8">
        <div className="bg-primary absolute -right-32 -bottom-12 -z-20 h-48 w-48 rounded-full"></div>
        <div className="bg-primary-light absolute -right-18 -bottom-8 -z-10 h-32 w-32 rounded-full"></div>
        <div className="rounded bg-white p-2 shadow-xl">
          <Truck size={32} className="text-body" />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span className="border-secondary-light w-4 border-t"></span>
            <h4 className="text-body text-lg font-bold">
              {INCOME_TYPES_FA[incomeType]}
            </h4>
            <span className="border-secondary-light w-4 border-t"></span>
          </div>
          <p className="text-body text-sm">
            ثبت درآمد از نوع <b>{INCOME_TYPES_FA[incomeType]}</b>
          </p>
        </div>
        <div className="rounded-xl p-2">
          <PlayCircle size={32} className="text-body" />
        </div>
      </div>
    </div>
  );
}
