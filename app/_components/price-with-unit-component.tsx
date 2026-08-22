import Image from "next/image";

import formatNumber from "@/app/_utilities/format-numbers";

interface PriceWithUnitProps {
  value: number;
  variant?: "primary" | "secondary";
  size?: number;
  valueClassName?: string;
  className?: string;
}

export default function PriceWithUnit({
  value,
  variant = "primary",
  size = 24,
  valueClassName = "text-body text-lg font-semibold",
  className,
}: PriceWithUnitProps) {
  return (
    <span className={"flex items-center gap-2 " + (className ?? "")}>
      <p className={valueClassName}>{formatNumber(value)}</p>
      <Image
        src={`/images/toman-${variant}.webp`}
        alt="تومان"
        width={size}
        height={size}
      />
    </span>
  );
}
