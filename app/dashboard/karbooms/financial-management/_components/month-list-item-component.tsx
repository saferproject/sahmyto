import { Key, Lock } from "iconsax-reactjs";
import dayjs from "dayjs";

import AnimatedListItem from "@/app/_components/animated-list-item-component";

import { MonthListItemProps } from "../_types/month-list-item-props";

import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";

export default function MonthListItemComponent({
  financialMonth,
  selectedMonth,
  onSelectMonth,
  index,
}: MonthListItemProps) {
  const { id, date, status } = financialMonth;

  const formattedDate = dayjs(date);
  const selectedMonthId = selectedMonth?.id ?? 0;

  return (
    <AnimatedListItem
      index={index}
      className={
        "relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all " +
        (selectedMonthId === id
          ? "bg-primary text-white shadow-lg"
          : "border-body text-body border border-dashed bg-white")
      }
      onClick={() => onSelectMonth(financialMonth)}
    >
      <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-center justify-between rounded-full bg-white p-1 shadow-lg">
        {status === "open" ? (
          <Key
            size="20"
            className={selectedMonthId === id ? "text-primary" : "text-body"}
            variant={selectedMonthId === id ? "Bold" : "Linear"}
          />
        ) : (
          <Lock
            size="20"
            className={selectedMonthId === id ? "text-primary" : "text-body"}
            variant={selectedMonthId === id ? "Bold" : "Linear"}
          />
        )}
      </span>
      <p className="text-sm font-semibold">
        {JALALI_CALENDAR_MONTHS_FA[formattedDate.month()]}
      </p>
      <p className="text-xs">{formattedDate.year()}</p>
    </AnimatedListItem>
  );
}
