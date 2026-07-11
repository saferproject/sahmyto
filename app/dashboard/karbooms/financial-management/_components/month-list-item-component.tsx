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
import dayjs from "dayjs";
import { motion } from "motion/react";

import { MonthListItemProps } from "../_types/month-list-item-props";

import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";

export default function MonthListItemComponent({
  financialMonth: { id, date, status },
  selectedMonthId,
  onSelectMonth,
  index
}: MonthListItemProps) {
  const formattedDate = dayjs(date);

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className={
        "relative flex min-w-28 snap-start snap-always flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all " +
        (selectedMonthId === id
          ? "bg-primary text-white"
          : "border-body text-body border border-dashed bg-white")
      }
      onClick={() => onSelectMonth(id)}
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
    </motion.li>
  );
}
