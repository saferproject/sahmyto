import type { PlanTier } from "../_types/plan-tier";

import PlanCrownComponent from "./plan-crown-component";

type PlanTierMarkComponentProps = {
  plan: PlanTier;
};

export default function PlanTierMarkComponent({
  plan,
}: PlanTierMarkComponentProps) {
  return (
    <div
      className="text-body flex h-6 items-center gap-[7px]"
      aria-label={`${plan.title}، ${plan.code}`}
    >
      <PlanCrownComponent icon={plan.icon} />
      <span className="flex flex-col items-center">
        <span className="text-[9px] leading-[10px] font-bold tracking-[-0.54px]">
          {plan.title}
        </span>
        <span
          dir="ltr"
          className="text-[10px] leading-[11px] font-medium tracking-normal"
        >
          {plan.code}
        </span>
      </span>
    </div>
  );
}
