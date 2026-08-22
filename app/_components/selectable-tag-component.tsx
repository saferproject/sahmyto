interface SelectableTagProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  variant?: "pill" | "tile" | "dashed";
}

const VARIANT_CLASSES: Record<NonNullable<SelectableTagProps["variant"]>, string> =
  {
    pill: "grow rounded-full border px-4 py-2 text-center text-sm",
    tile: "grow rounded-lg border px-8 py-2 text-center",
    dashed:
      "min-w-20 w-full rounded-lg border border-dashed p-2 text-center text-sm font-semibold",
  };

export default function SelectableTagComponent({
  label,
  selected,
  onSelect,
  variant = "pill",
}: SelectableTagProps) {
  const selectedClasses: Record<
    NonNullable<SelectableTagProps["variant"]>,
    string
  > = {
    pill: "border-primary text-primary",
    tile: "bg-primary border-primary text-white shadow-lg",
    dashed: "bg-primary text-white border-primary shadow-lg",
  };

  const unselectedClasses: Record<
    NonNullable<SelectableTagProps["variant"]>,
    string
  > = {
    pill: "border-secondary-light text-body",
    tile: "border-secondary-light bg-secondary-lightest text-body",
    dashed: "bg-secondary-lightest text-body border-body",
  };

  return (
    <div
      className={
        `${VARIANT_CLASSES[variant]} ` +
        (selected ? selectedClasses[variant] : unselectedClasses[variant])
      }
      onClick={onSelect}
    >
      {label}
    </div>
  );
}
