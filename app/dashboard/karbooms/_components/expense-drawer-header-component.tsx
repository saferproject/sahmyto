import { ExpenseDrawerHeaderProps } from "../_types/expense-drawer-header-props";

export default function ExpenseDrawerHeaderComponent({
}: ExpenseDrawerHeaderProps) {
  return (
    <div className="my-4 flex w-full items-center justify-center">
      <h4 className="text-body font-semibold text-lg">ثبت هزینه</h4>
    </div>
  );
}
