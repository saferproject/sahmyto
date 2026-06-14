import { CategoryTypeProps } from "../_types/category-type-props";

export default function CategoryTypeComponent({
  category,
  label,
  selectedCategoryType,
  onSelectCategoryType,
}: CategoryTypeProps) {
  return (
    <p
      className={
        "grow rounded-lg border px-8 py-2 text-center " +
        (category === selectedCategoryType
          ? "bg-primary border-primary text-white shadow-lg"
          : "border-secondary-light bg-secondary-lightest text-body")
      }
      onClick={() => onSelectCategoryType(category)}
    >
      {label}
    </p>
  );
}
