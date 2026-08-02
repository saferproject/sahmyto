import { TomanUnitProps } from "../_types/toman-unit-props";

export default function TomanUnitComponent({
  compact = false,
}: TomanUnitProps) {
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
