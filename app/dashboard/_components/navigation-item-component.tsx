import { usePathname, useRouter } from "next/navigation";

import NavigationItemProps from "../_types/navigation-item-props";

export default function NavigationItemCompoent({ title, icon, path }: NavigationItemProps) {
  const currentPath = usePathname();
  const router = useRouter();

  currentPath === "/dashboard";

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
          (currentPath === path ? "bg-primary text-white" : "")
        }
      >
        {icon}
      </div>
    </li>
  );
}
