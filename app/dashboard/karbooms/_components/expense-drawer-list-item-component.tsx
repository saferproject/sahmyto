import { KarboomExpenseDrawerListItemProps } from "../_types/karboom-expense-drawer-list-item-props";

export default function ExpenseDrawerListItemComponent({
  id,
  name,
  selectedCategory,
  onSelectCategory,
}: KarboomExpenseDrawerListItemProps) {
  return (
    <p
      className={
        "min-w-20 w-full rounded-lg border border-dashed p-2 text-center text-sm font-semibold " +
        (id === selectedCategory
          ? "bg-primary text-white border-primary shadow-lg"
          : "bg-secondary-lightest text-body border-body")
      }
      onClick={() => onSelectCategory(id)}
    >
      {name}
    </p>
  );
}
