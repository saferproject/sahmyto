import formatNumber from "@/app/_utilities/format-numbers";

import PartnersListHeaderProps from "../_interfaces/partners-list-header-props";

export default function PartnersListHeaderComponent({
  partnersCount = 0,
}: PartnersListHeaderProps) {
  return (
    <div className="flex w-full items-start justify-start">
      <p>تعداد شریک ها: {formatNumber(partnersCount)}</p>
    </div>
  );
}
