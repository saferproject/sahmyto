import Image from "next/image";

import { PlayCircle } from "iconsax-reactjs";

import { IncomeTypeProps } from "../_types/income-type-props";

export default function IncomeTypeComponent({
  title,
  type,
  description,
  onSelect,
}: IncomeTypeProps) {
  return (
    <div
      className="border-secondary relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed p-2"
      onClick={() => onSelect(type)}
    >
      <Image
        src="/images/income-type-tag.svg"
        alt=""
        className="absolute -top-6 right-0"
        width={48}
        height={48}
      />
      <PlayCircle size={32} className="text-secondary absolute top-2 left-2" />
      <h4 className="text-body flex items-center gap-2 text-lg font-bold">
        <span className="border-secondary-light w-4 border-t"></span>
        {title}
        <span className="border-secondary-light w-4 border-t"></span>
      </h4>
      <p className="text-body text-sm">
        {description} <span className="font-semibold">{title}</span>
      </p>
    </div>
  );
}
