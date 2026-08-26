import { Book1, Sms, Truck, VideoPlay, Wallet } from "iconsax-reactjs";

import DrawerMenuItem from "../_interfaces/drawer-menu-item";

export const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  {
    id: 1,
    title: "آموزش",
    icon: <VideoPlay size={24} />,
    link: "/dashboard/tutorial",
    disabled: false,
  },
  {
    id: 2,
    title: "کاربوم ها",
    icon: <Truck size={24} />,
    link: "/dashboard/karbooms",
    disabled: false,
  },
  {
    id: 3,
    title: "مخاطبین",
    icon: <Book1 size={24} />,
    link: "/dashboard/contacts",
    disabled: false,
  },
  {
    id: 4,
    title: "کیف پول",
    icon: <Wallet size={24} />,
    link: "/dashboard/wallet",
    disabled: false,
  },
  {
    id: 5,
    title: "درخواست ها",
    icon: <Sms size={24} />,
    link: "/dashboard/notifications",
    disabled: true,
  },
];
