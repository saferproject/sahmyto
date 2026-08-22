import { usePathname, useRouter } from "next/navigation";

import NavigationItemProps from "../_types/navigation-item-props";
import { useSnackbar } from "notistack";

export default function NavigationItemComponent({
  title,
  icon,
  path,
  disabled,
}: NavigationItemProps) {
  const currentPath = usePathname();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // The home tab ("/dashboard") matches only its exact path; every other tab
  // also stays active on its nested routes (e.g. /dashboard/karbooms/...).
  const isActive =
    path === "/dashboard"
      ? currentPath === path
      : currentPath === path || currentPath.startsWith(path + "/");

  const handleNavigation = (path: string) => {
    if (!disabled) router.push(path);
    else enqueueSnackbar({ variant: "info", message: "صفحه درحال توسعه است" });
  };

  return (
    <li
      title={title}
      className={
        "flex items-center gap-2 rounded-full px-4 py-2 " +
        (disabled
          ? "text-secondary"
          : isActive
            ? "bg-primary-light text-body"
            : "text-body")
      }
      onClick={() => handleNavigation(path)}
    >
      {isActive && <span className="text-sm">{title}</span>}
      {icon}
    </li>
  );
}
