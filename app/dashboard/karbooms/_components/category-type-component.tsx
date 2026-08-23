import SelectableTagComponent from "@/app/_components/selectable-tag-component";

import { CategoryTypeProps } from "../_types/category-type-props";

export default function CategoryTypeComponent({
  category,
  label,
  selectedCategoryType,
  onSelectCategoryType,
}: CategoryTypeProps) {
  return (
    <SelectableTagComponent
      label={label}
      selected={category === selectedCategoryType}
      onSelect={() => onSelectCategoryType(category)}
      variant="tile"
    />
  );
}
