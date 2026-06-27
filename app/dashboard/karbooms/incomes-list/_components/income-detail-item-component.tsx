import { DetailItemProps } from "../_types/income-detail-item-props";

export default function DetailItemComponent({
  label,
  value,
  valueColor = "text-body",
}: DetailItemProps) {
  return (
    <li className="relative flex items-center justify-between">
      <div className="border-secondary absolute top-1/2 w-full border-t border-dotted"></div>
      <p className="text-body z-10 bg-white pl-2">{label}</p>
      <p className={`${valueColor} z-10 bg-white pr-2 font-semibold`}>
        {value}
      </p>
    </li>
  );
}
