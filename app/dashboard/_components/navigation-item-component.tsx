import { usePathname, useRouter } from "next/navigation";

import NavigationItemProps from "../_types/navigation-item-props";

export default function NavigationItemComponent({
  title,
  icon,
  path,
}: NavigationItemProps) {
  const currentPath = usePathname();
  const router = useRouter();

  // The home tab ("/dashboard") matches only its exact path; every other tab
  // also stays active on its nested routes (e.g. /dashboard/karbooms/...).
  const isActive =
    path === "/dashboard"
      ? currentPath === path
      : currentPath === path || currentPath.startsWith(path + "/");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <li
      title={title}
      className={
        "text-body flex items-center rounded-full py-2 px-4 gap-2 " +
        (isActive ? "bg-primary-light" : "")
      }
      onClick={() => handleNavigation(path)}
    >
      {isActive && <span className="text-sm">{title}</span>}
      {icon}
    </li>
  );
}
