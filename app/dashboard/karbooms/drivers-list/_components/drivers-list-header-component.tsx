import { DriversListHeaderProps } from "../_types/drivers-list-header-props";

export default function DriversListHeaderComponent({
  driversCount,
}: DriversListHeaderProps) {
  return (
    <div className="flex w-full items-start justify-start">
      <p>تعداد رانندگان: {driversCount}</p>
    </div>
  );
}
