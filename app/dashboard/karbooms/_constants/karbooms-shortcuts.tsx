import { Bus, HandMoney, WalletMoney } from "@solar-icons/react/ssr";

import KarboomsShortcut from "../_interfaces/karbooms-shortcut";

export const KARBOOMS_SHORTCUTS: KarboomsShortcut[] = [
  {
    id: 1,
    title: "درآمد ها",
    icon: <HandMoney weight="Bold" size={24} />,
    path: "/dashboard/incomes",
  },
  {
    id: 2,
    title: "هزینه ها",
    icon: <WalletMoney weight="Bold" size={24} />,
    path: "/dashboard/expenses",
  },
  {
    id: 3,
    title: "تعمیرات",
    icon: <Bus weight="Bold" size={24} />,
    path: "/dashboard/maintenance",
  },
  {
    id: 4,
    title: "دریافتی ها",
    icon: <Bus weight="Bold" size={24} />,
    path: "/dashboard/payments",
  },
];
