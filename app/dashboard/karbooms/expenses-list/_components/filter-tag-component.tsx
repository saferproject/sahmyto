import FilterTagProps from "../_interfaces/filter-tag-props";

export default function FilterTagComponent({
  tag,
  selectedTagId,
  onSelectTag,
}: FilterTagProps) {
  const { id, label } = tag;

  return (
    <div
      className={
        "grow rounded-full border px-4 py-2 text-center text-sm " +
        (id === selectedTagId
          ? " border-primary text-primary"
          : "border-secondary-light text-body")
      }
      onClick={() => onSelectTag(tag)}
    >
      {label}
    </div>
  );
}
