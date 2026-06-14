import { Bus } from "@solar-icons/react";

import DrawerMenuItem from "../_interfaces/drawer-menu-item";

export const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  {
    id: 1,
    title: "کاربوم ها",
    icon: <Bus size={24} />,
    link: "/dashboard/karbooms",
  },
  {
    id: 2,
    title: "مخاطبین",
    icon: <Bus size={24} />,
    link: "/dashboard/contacts",
  },
  {
    id: 3,
    title: "کیف پول",
    icon: <Bus size={24} />,
    link: "/dashboard/wallet",
  },
  {
    id: 4,
    title: "عملکرد روزانه",
    icon: <Bus size={24} />,
    link: "/dashboard/summery",
  },
  {
    id: 5,
    title: "پیام ها",
    icon: <Bus size={24} />,
    link: "/dashboard/notifications",
  },
  {
    id: 6,
    title: "استخدام راننده",
    icon: <Bus size={24} />,
    link: "/dashboard/hire-driver",
  },
  {
    id: 7,
    title: "آموزش",
    icon: <Bus size={24} />,
    link: "/dashboard/tutorial",
  },
];
