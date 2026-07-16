import Image from "next/image";

import { EmptyWalletTime } from "iconsax-reactjs";

import formatNumber from "@/app/_utilities/format-numbers";

import { MonthBalanceProps } from "../_types/month-balance-props";

export default function MonthBalanceComponent({ balance }: MonthBalanceProps) {
  return (
    <div className="text-body border-secondary mt-4 flex w-full items-center justify-between rounded-2xl border border-dashed bg-white p-4 shadow-lg">
      <div className="flex items-center gap-4">
        <EmptyWalletTime size="32" />
        <p>تراز دوره</p>
      </div>
      <div className="flex items-center gap-4">
        <p>{formatNumber(balance)}</p>
        <Image
          src="/images/toman-secondary.webp"
          alt="تومان"
          width={24}
          height={24}
        />
      </div>
    </div>
  );
}
