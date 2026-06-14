import { ArrowLeft2 } from "iconsax-reactjs";
import DashboardShortcutProps from "../_interfaces/dashboard-shortcut-props";

export default function DashboardShortcut({ title, icon, onClick }: DashboardShortcutProps) {
  return (
    <div
      className="relative flex basis-1/2 items-center justify-between rounded-xl bg-gray-100 px-4 py-8"
      onClick={onClick}
    >
      <div className="border-primary-light bg-primary absolute -right-4 flex items-center justify-center rounded-full border-2 p-1">
        {icon}
      </div>
      <div></div>
      <p className="text-body text-sm font-semibold">{title}</p>
      <ArrowLeft2 className="text-body" />
    </div>
  );
}
