import Image from "next/image";

import { ChartSquare } from "iconsax-reactjs";

import TomanUnitComponent from "./toman-unit-component";

export default function WalletBalanceCardComponent() {
  return (
    <section
      aria-labelledby="wallet-balance-title"
      className="relative h-[188px] w-[351px] max-w-full shrink-0"
    >
      <div className="absolute top-[-7px] left-7 h-4 w-[calc(100%-56px)] rounded-full bg-white/30" />
      <div className="absolute bottom-9 left-4 h-[17px] w-[calc(100%-95px)] rounded-full bg-[#f0f0f0]" />
      <Image
        src="/images/wallet-card-base.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 440px) calc(100vw - 32px), 351px"
        className="relative z-10 object-fill"
      />
      <Image
        src="/images/wallet-card-lines.svg"
        alt=""
        fill
        priority
        sizes="(max-width: 440px) calc(100vw - 32px), 351px"
        className="relative z-20 object-fill"
      />

      <div className="absolute inset-x-[34px] top-[27px] z-30 flex items-center justify-between">
        <h1
          id="wallet-balance-title"
          className="text-[11px] font-normal tracking-[-1px] text-[#162864]"
        >
          موجودی کیف پـول
        </h1>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-1 text-[10px] font-bold tracking-[-1px] text-[#fb6a02]"
        >
          <span>افزایش مـوجودی</span>
          <span
            aria-hidden="true"
            className="text-sm leading-none text-[#162864]"
          >
            +
          </span>
        </button>
      </div>

      <div
        dir="ltr"
        className="absolute inset-x-0 top-[67px] z-30 flex items-center justify-center gap-2 text-[#162864]"
      >
        <TomanUnitComponent />
        <p
          dir="rtl"
          className="text-[23px] leading-8 font-bold tracking-[1.15px]"
        >
          ۵٬۳۶۵٬۹۸۰
        </p>
      </div>

      <span className="absolute right-[75px] bottom-[64px] z-30 size-[7px] rounded-full border-2 border-[#fb6a02] bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.75)]" />

      <span className="absolute right-[15px] bottom-[-4px] z-30 flex size-7 items-center justify-center rounded-[9px] bg-gradient-to-br from-[#ff9b30] to-[#fb6a02] shadow-[0_4px_7px_rgba(22,40,100,0.24)] ring-4 ring-white">
        <ChartSquare
          aria-hidden="true"
          size={13}
          variant="Broken"
          className="text-white"
        />
      </span>
    </section>
  );
}
