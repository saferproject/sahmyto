import { Bus, MoneyRecive, Home, Sms, WalletMoney } from "iconsax-reactjs";
import NavigationItem from "../_interfaces/navigation-item";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 1,
    title: "درآمد ها",
    icon: <WalletMoney variant="Bold" size={24} />,
    path: "/dashboard/expenses",
  },
  {
    id: 2,
    title: "هزینه ها",
    icon: <MoneyRecive variant="Bold" size={24} />,
    path: "/dashboard/incomes",
  },
  {
    id: 3,
    title: "داشبورد",
    icon: <Home variant="Bold" size={32} />,
    path: "/dashboard",
  },
  {
    id: 4,
    title: "پیام ها",
    icon: <Sms variant="Bold" size={24} />,
    path: "/dashboard/inbox",
  },
  {
    id: 5,
    title: "کاربوم ها",
    icon: <Bus variant="Bold" size={24} />,
    path: "/dashboard/karbooms",
  },
];
