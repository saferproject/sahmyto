import { Mobile, ReceiptText } from "iconsax-reactjs";

import { TransactionIconProps } from "../_types/transaction-icon-props";

export default function TransactionIconComponent({
  icon,
  tone,
}: TransactionIconProps) {
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
