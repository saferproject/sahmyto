import Image from "next/image";

import {
  ArrowDown2,
  Candle,
  ChartSquare,
  Mobile,
  ReceiptText,
} from "iconsax-reactjs";

type TransactionTone = "orange" | "green";

interface WalletTransaction {
  id: number;
  title: string;
  amount: string;
  date: string;
  tone: TransactionTone;
  icon: "wallet" | "report";
}

const TRANSACTIONS: WalletTransaction[] = [
  {
    id: 1,
    title: "واریز به کیف سهمیتو",
    amount: "۱۰٬۰۰۰٬۰۰۰",
    date: "شنبه ۰۴ اردیبهشت ۱۴۰۴ ۱۳:۵۲",
    tone: "orange",
    icon: "wallet",
  },
  {
    id: 2,
    title: "کسر بابت افزودن ناوگان جدید",
    amount: "۶٬۵۰۰",
    date: "شنبه ۰۴ اردیبهشت ۱۴۰۴ ۱۳:۵۲",
    tone: "orange",
    icon: "wallet",
  },
  {
    id: 3,
    title: "درخواست گزارش سالیانه",
    amount: "۶٬۵۰۰",
    date: "شنبه ۰۴ اردیبهشت ۱۴۰۴ ۱۳:۵۲",
    tone: "green",
    icon: "report",
  },
  {
    id: 4,
    title: "کسر بابت افزودن ناوگان جدید",
    amount: "۶٬۵۰۰",
    date: "شنبه ۰۴ اردیبهشت ۱۴۰۴ ۱۳:۵۲",
    tone: "orange",
    icon: "wallet",
  },
  {
    id: 5,
    title: "درخواست گزارش سالیانه",
    amount: "۶٬۵۰۰",
    date: "شنبه ۰۴ اردیبهشت ۱۴۰۴ ۱۳:۵۲",
    tone: "green",
    icon: "report",
  },
];

function TomanUnit({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-label="تومان"
      className={
        "flex shrink-0 flex-col text-center font-medium " +
        (compact ? "text-[6px] leading-[5px]" : "text-[10px] leading-[9px]")
      }
    >
      <span>تــــو</span>
      <span>مــان</span>
    </span>
  );
}

function TransactionIcon({
  icon,
  tone,
}: Pick<WalletTransaction, "icon" | "tone">) {
  const color = tone === "orange" ? "#fb6a02" : "#18b99a";

  return (
    <span className="relative flex size-6 shrink-0 items-center justify-center">
      <span className="absolute inset-[2px] rounded-full border border-[#b5cbdb] bg-white shadow-[0_3px_5px_rgba(28,39,76,0.18)]" />
      <span
        className="absolute right-0 bottom-0 size-[9px] rounded-full border bg-white"
        style={{ borderColor: color }}
      />
      {icon === "wallet" ? (
        <Mobile
          aria-hidden="true"
          size={11}
          variant="Broken"
          color={color}
          className="relative z-10"
        />
      ) : (
        <ReceiptText
          aria-hidden="true"
          size={11}
          variant="Broken"
          color={color}
          className="relative z-10"
        />
      )}
      <span
        className="absolute right-[1px] bottom-[1px] z-10 text-[7px] leading-none"
        style={{ color }}
      >
        +
      </span>
    </span>
  );
}

function TransactionItem({
  title,
  amount,
  date,
  tone,
  icon,
}: Omit<WalletTransaction, "id">) {
  return (
    <li className="flex h-[54px] w-full items-center gap-2 rounded-[15px] border-[0.5px] border-[#b5cbdb] bg-white px-[10px] text-[#162864]">
      <TransactionIcon icon={icon} tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] leading-4 font-semibold tracking-[-0.8px]">
          {title}
        </p>
        <p className="truncate text-[9px] leading-4 font-normal tracking-[-0.45px]">
          {date}
        </p>
      </div>
      <div className="relative h-8 w-[95px] shrink-0 text-[#1b2854]">
        <div className="flex items-start justify-end gap-2 pt-[2px]">
          <span className="text-[10px] leading-4 font-semibold tracking-[-0.3px]">
            {amount}
          </span>
          <TomanUnit compact />
        </div>
        <ArrowDown2
          aria-hidden="true"
          size={11}
          variant="Bold"
          className="absolute bottom-0 left-[2px] text-[#b5cbdb]"
        />
      </div>
    </li>
  );
}

function WalletBalanceCard() {
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
        <TomanUnit />
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

export default function WalletPage() {
  return (
    <div className="flex min-h-full w-full max-w-[440px] flex-col items-center bg-white pt-[122px] pb-12">
      <WalletBalanceCard />

      <section
        aria-labelledby="transactions-title"
        className="mt-11 w-[329px] max-w-full text-[#162864]"
      >
        <div className="flex h-[22px] items-center justify-between px-6">
          <h2
            id="transactions-title"
            className="text-[11px] font-semibold tracking-[-0.99px]"
          >
            لیست تراکنش ها
          </h2>
          <Candle
            aria-hidden="true"
            size={22}
            variant="Broken"
            className="text-[#162864]"
          />
        </div>

        <ul className="mt-[26px] flex flex-col gap-[19px]">
          {TRANSACTIONS.map(({ id, ...transaction }) => (
            <TransactionItem key={id} {...transaction} />
          ))}
        </ul>
      </section>
    </div>
  );
}
