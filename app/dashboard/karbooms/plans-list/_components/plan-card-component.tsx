import type { CSSProperties } from "react";

import { Add } from "iconsax-reactjs";

import type { PlanCard } from "../_types/plan-card";

import PlanCrownComponent from "./plan-crown-component";

type PlanCardComponentProps = {
  plan: PlanCard;
};

type PlanCardStyles = CSSProperties & {
  "--plan-accent": string;
  "--plan-header": string;
  "--plan-glow": string;
};

export default function PlanCardComponent({ plan }: PlanCardComponentProps) {
  const styles: PlanCardStyles = {
    "--plan-accent": plan.accentColor,
    "--plan-header": plan.headerColor,
    "--plan-glow": plan.glowColor,
  };

  return (
    <article
      className="relative h-[158px] w-full rounded-[18px] border border-[var(--plan-accent)] bg-[var(--plan-accent)] text-[#162864]"
      style={styles}
    >
      <div className="absolute inset-[0_3px_3px_0] rounded-[18px] bg-white" />
      <div className="absolute -top-4 -left-3 h-20 w-24 rounded-full bg-[var(--plan-glow)] opacity-60 blur-xl" />
      <div className="absolute top-[34px] bottom-[27px] left-0 w-[27px] bg-[var(--plan-accent)] [clip-path:polygon(0_0,100%_50%,0_100%)]" />

      <div className="absolute top-[13px] right-[13px] left-[15px] z-10 flex h-[31px] items-center justify-between rounded-full bg-[var(--plan-header)] pr-[17px] pl-[55px]">
        <h2 className="text-[11px] leading-none font-bold whitespace-nowrap">
          {plan.title}
        </h2>
        <p
          dir="ltr"
          className="text-[8px] leading-none font-medium tracking-[-0.25px] whitespace-nowrap"
        >
          {plan.label}
        </p>
      </div>

      <PlanCrownComponent
        icon={plan.icon}
        count={plan.crownCount}
        glowColor={plan.glowColor}
        size="large"
        className="absolute -top-[7px] -left-[3px] z-20"
      />

      <ul className="absolute top-[58px] right-[25px] z-10 flex flex-col text-[8.5px] leading-[18px] font-semibold tracking-[-0.3px] whitespace-nowrap">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-[7px]">
            <span className="size-[3px] shrink-0 rounded-full bg-[#bdc9dd]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-[22px] left-[25px] z-10 flex items-end gap-[5px] font-bold">
        <span
          aria-label="تومان"
          className="flex flex-col text-center text-[7px] leading-[6px]"
        >
          <span aria-hidden="true">تو</span>
          <span aria-hidden="true">مان</span>
        </span>
        <span className="text-[14px] leading-[14px] tracking-[0.3px]">
          {plan.price}
        </span>
      </div>

      <button
        type="button"
        aria-label={`انتخاب ${plan.title}`}
        className="absolute top-[66px] left-[8px] z-30 flex size-[27px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_5px_8px_rgba(22,40,100,0.45)]"
      >
        <Add size={20} className="text-[#35385f]" />
      </button>
    </article>
  );
}
