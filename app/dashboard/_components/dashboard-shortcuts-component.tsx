"use client";

import { useRouter } from "next/navigation";

import { DASHBOARD_SHORTCUTS } from "../_constants/dashboard-shortcuts";
import DashboardShortcut from "./dashboard-shortcut-component";

export default function DashboardShortcutsComponent() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mt-8 grid w-full grid-cols-2 grid-rows-2 gap-x-8 gap-y-4">
      {DASHBOARD_SHORTCUTS.map(({ id, path, ...other }) => (
        <DashboardShortcut
          {...other}
          key={id}
          onClick={() => handleNavigation(path)}
        />
      ))}
    </div>
  );
}
