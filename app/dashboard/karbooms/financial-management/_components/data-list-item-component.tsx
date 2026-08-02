import formatNumber from "@/app/_utilities/format-numbers";
import { ArrowDown2 } from "iconsax-reactjs";
import Image from "next/image";
import { useState } from "react";

type DataListItemProps = {
  title: string;
  value: number;
};

export default function DataListItemComponent({
  title,
  value,
}: DataListItemProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleToggleDetails = () => {
    setIsDetailsOpen((curValue) => !curValue);
  };

  return (
    <li
      className={
        "text-body overflow-y-hidden transition-all " +
        (isDetailsOpen ? "max-h-1000" : "max-h-14.5")
      }
    >
      <div
        className="border-secondary flex w-full items-center justify-between rounded-2xl border bg-white p-4"
        onClick={handleToggleDetails}
      >
        <p>{title}</p>
        <div className="flex items-center gap-4">
          <p>{formatNumber(value)}</p>
          <Image
            src="/images/toman-secondary.webp"
            alt="تومان"
            width={24}
            height={24}
          />
          <ArrowDown2
            size="24"
            className={
              "transition-all " + (isDetailsOpen ? "rotate-z-180" : undefined)
            }
          />
        </div>
      </div>
    </li>
  );
}
