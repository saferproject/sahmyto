import { usePathname, useRouter } from "next/navigation";

import NavigationItemProps from "../_types/navigation-item-props";

export default function NavigationItemCompoent({ title, icon, path }: NavigationItemProps) {
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
      className="flex w-1/5 justify-center"
      onClick={() => handleNavigation(path)}
    >
      <div
        className={
          "flex h-10 w-10 items-center justify-center rounded-full " +
          (isActive ? "bg-primary text-white" : "")
        }
      >
        {icon}
      </div>
    </li>
  );
}
