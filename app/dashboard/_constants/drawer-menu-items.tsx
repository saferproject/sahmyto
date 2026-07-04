import { Book1, Sms, Truck, VideoPlay, Wallet } from "iconsax-reactjs";

import DrawerMenuItem from "../_interfaces/drawer-menu-item";

export const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
  {
    id: 1,
    title: "کاربوم ها",
    icon: <Truck size={24} />,
    link: "/dashboard/karbooms",
  },
  {
    id: 2,
    title: "مخاطبین",
    icon: <Book1 size={24} />,
    link: "/dashboard/contacts",
  },
  {
    id: 3,
    title: "کیف پول",
    icon: <Wallet size={24} />,
    link: "/dashboard/wallet",
  },
  // {
  //   id: 4,
  //   title: "عملکرد روزانه",
  //   icon: <Bus size={24} />,
  //   link: "/dashboard/summery",
  // },
  {
    id: 5,
    title: "درخواست ها",
    icon: <Sms size={24} />,
    link: "/dashboard/notifications",
  },
  // {
  //   id: 6,
  //   title: "استخدام راننده",
  //   icon: <Bus size={24} />,
  //   link: "/dashboard/hire-driver",
  // },
  {
    id: 7,
    title: "آموزش",
    icon: <VideoPlay size={24} />,
    link: "/dashboard/tutorial",
  },
];
