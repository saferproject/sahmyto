import { Bus, HandMoney, Home, Mailbox, WalletMoney } from "@solar-icons/react";
import NavigationItem from "../_interfaces/navigation-item";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 1,
    title: "درآمد ها",
    icon: <WalletMoney weight="Bold" size={24} />,
    path: "/dashboard/expenses",
  },
  {
    id: 2,
    title: "هزینه ها",
    icon: <HandMoney weight="Bold" size={24} />,
    path: "/dashboard/incomes",
  },
  {
    id: 3,
    title: "داشبورد",
    icon: <Home weight="Bold" size={32} />,
    path: "/dashboard",
  },
  {
    id: 4,
    title: "پیام ها",
    icon: <Mailbox weight="Bold" size={24} />,
    path: "/dashboard/inbox",
  },
  {
    id: 5,
    title: "کاربوم ها",
    icon: <Bus weight="Bold" size={24} />,
    path: "/dashboard/karbooms",
  },
];
