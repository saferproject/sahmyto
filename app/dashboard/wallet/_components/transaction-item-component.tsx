import { ArrowDown2 } from "iconsax-reactjs";

import TomanUnitComponent from "./toman-unit-component";
import TransactionIconComponent from "./transaction-icon-component";

import { TransactionItemProps } from "../_types/transaction-item-props";

export default function TransactionItemComponent({
  title,
  amount,
  date,
  tone,
  icon,
}: TransactionItemProps) {
  return (
    <li className="flex h-[54px] w-full items-center gap-2 rounded-[15px] border-[0.5px] border-[#b5cbdb] bg-white px-[10px] text-[#162864]">
      <TransactionIconComponent icon={icon} tone={tone} />
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
          <TomanUnitComponent compact />
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
