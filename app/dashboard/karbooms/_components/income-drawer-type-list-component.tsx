import { INCOME_TYPES } from "../_constants/income-types";

import { IncomeDrawerTypeListProps } from "../_types/income-drawer-type-list-props";

import IncomeTypeComponent from "./income-type-component";

export default function IncomeDrawerTypeListComponent({
  onTypeSelect,
}: IncomeDrawerTypeListProps) {
  return (
    <div className="mt-8 grid h-96 w-full grid-cols-2 gap-8">
      {INCOME_TYPES.map((type) => (
        <IncomeTypeComponent
          key={type.type}
          {...type}
          onSelect={onTypeSelect}
        />
      ))}
    </div>
  );
}
