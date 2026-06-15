import { Bus, MoneyRecive, WalletMoney } from "iconsax-reactjs";

import KarboomsShortcut from "../_interfaces/karbooms-shortcut";

export const KARBOOMS_SHORTCUTS: KarboomsShortcut[] = [
  {
    id: 1,
    title: "درآمد ها",
    icon: <MoneyRecive variant="Bold" size={24} />,
    path: "/dashboard/incomes",
  },
  {
    id: 2,
    title: "هزینه ها",
    icon: <WalletMoney variant="Bold" size={24} />,
    path: "/dashboard/expenses",
  },
  {
    id: 3,
    title: "تعمیرات",
    icon: <Bus variant="Bold" size={24} />,
    path: "/dashboard/maintenance",
  },
  {
    id: 4,
    title: "دریافتی ها",
    icon: <Bus variant="Bold" size={24} />,
    path: "/dashboard/payments",
  },
];
