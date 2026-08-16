import PlanTierMarkComponent from "./plan-tier-mark-component";

import type { PlanTier } from "../_types/plan-tier";

type PlansSummaryComponentProps = {
  activePlan: PlanTier;
};

export default function PlansSummaryComponent({
  activePlan,
}: PlansSummaryComponentProps) {
  return (
    <section className="text-body relative h-6 w-full shrink-0">
      <h1 className="absolute top-[5px] right-[31px] text-[11px] leading-[14px] font-bold tracking-[-0.66px] whitespace-nowrap">
        پلن های سهمیتو
      </h1>
      <p className="absolute top-[5px] left-16 text-[10px] leading-[13px] font-bold tracking-[-0.6px] whitespace-nowrap">
        پلن فعال شما
      </p>
      <div className="absolute top-0 left-[11px]">
        <PlanTierMarkComponent plan={activePlan} />
      </div>
    </section>
  );
}
