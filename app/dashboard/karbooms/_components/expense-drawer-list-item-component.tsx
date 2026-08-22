import SelectableTagComponent from "@/app/_components/selectable-tag-component";

import { KarboomExpenseDrawerListItemProps } from "../_types/karboom-expense-drawer-list-item-props";

export default function ExpenseDrawerListItemComponent({
  id,
  name,
  selectedCategory,
  onSelectCategory,
}: KarboomExpenseDrawerListItemProps) {
  return (
    <SelectableTagComponent
      label={name}
      selected={id === selectedCategory}
      onSelect={() => onSelectCategory(id)}
      variant="dashed"
    />
  );
}
