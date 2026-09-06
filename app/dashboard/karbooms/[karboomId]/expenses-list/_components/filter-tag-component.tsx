import SelectableTagComponent from "@/app/_components/selectable-tag-component";

import FilterTagProps from "../_interfaces/filter-tag-props";

export default function FilterTagComponent({
  tag,
  selectedTagId,
  onSelectTag,
}: FilterTagProps) {
  const { id, label } = tag;

  return (
    <SelectableTagComponent
      label={label}
      selected={id === selectedTagId}
      onSelect={() => onSelectTag(tag)}
      variant="pill"
    />
  );
}
