import { Card, Home2, Profile, MessageText1 } from "iconsax-reactjs";
import NavigationItem from "../_interfaces/navigation-item";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 1,
    title: "پیام ها",
    icon: <MessageText1 variant="Bold" size="24" />,
    path: "/dashboard/requests",
    disabled: true,
  },
  {
    id: 2,
    title: "کیف پول",
    icon: <Card variant="Bold" size="24" />,
    path: "/dashboard/wallet",
    disabled: false,
  },
  {
    id: 3,
    title: "داشبورد",
    icon: <Home2 variant="Bold" size="24" />,
    path: "/dashboard",
    disabled: false,
  },
  {
    id: 4,
    title: "پروفایل",
    icon: <Profile variant="Bold" size="24" />,
    path: "/dashboard/profile",
    disabled: false,
  },
];
