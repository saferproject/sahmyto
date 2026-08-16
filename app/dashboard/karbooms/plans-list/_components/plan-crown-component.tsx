import Image, { type StaticImageData } from "next/image";

type PlanCrownComponentProps = {
  icon: StaticImageData;
  className?: string;
  count?: 1 | 2;
  glowColor?: string;
  size?: "small" | "large";
};

export default function PlanCrownComponent({
  icon,
  className = "",
  count = 1,
  glowColor,
  size = "small",
}: PlanCrownComponentProps) {
  if (size === "small") {
    return (
      <span
        aria-hidden="true"
        className={`relative h-[13.335px] w-[15.555px] shrink-0 overflow-hidden ${className}`}
      >
        <Image
          src={icon}
          alt=""
          className="absolute -top-[1.9px] -left-[7.5px] h-[20.1px] w-[31.1px] max-w-none"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`block h-[50px] ${count === 2 ? "w-[68px]" : "w-12"} ${className}`}
      style={{
        filter: glowColor ? `drop-shadow(0 0 8px ${glowColor})` : undefined,
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="absolute h-[42px] w-12 overflow-hidden"
          style={{ left: `${index * 18}px`, top: `${index * 7}px` }}
        >
          <Image
            src={icon}
            alt=""
            className="absolute -top-[6px] -left-[23px] h-[62px] w-[96px] max-w-none"
          />
        </span>
      ))}
    </span>
  );
}
