import { Bus } from "iconsax-reactjs";
import { INCOME_TYPES } from "../_constants/income-types";

import { IncomeDrawerTypeListProps } from "../_types/income-drawer-type-list-props";
import IncomeTypeComponent from "./income-type-component";

export default function IncomeDrawerTypeListComponent({
  onTypeSelect,
}: IncomeDrawerTypeListProps) {
  return (
    <>
      <div className="mt-8 grid h-96 w-full grid-cols-2 gap-8">
        {INCOME_TYPES.map((type) => (
          <IncomeTypeComponent
            key={type.type}
            {...type}
            onSelect={onTypeSelect}
          />
        ))}
      </div>
      <button
        type="button"
        className="border-secondary text-body mt-8 flex w-full items-center justify-between rounded-2xl border p-4"
        onClick={() => onTypeSelect("travel")}
      >
        <div className="flex items-center gap-4">
          <Bus size={32} />
          <h4 className="text-lg font-bold">سفر</h4>
        </div>
        <p>ثبت درآمد کارکرد سفر</p>
      </button>
    </>
  );
}
