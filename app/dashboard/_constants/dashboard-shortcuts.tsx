import { Bus } from "iconsax-reactjs";

import NavigationItem from "../_interfaces/navigation-item";

export const DASHBOARD_SHORTCUTS: NavigationItem[] = [
  {
    id: 1,
    title: "هزینه ها",
    icon: <Bus size={32} className="text-white" />,
    path: "/dashboard/expenses",
  },
  {
    id: 2,
    title: "درآمد ها",
    icon: <Bus size={32} className="text-white" />,
    path: "/dashboard/incomes",
  },
  {
    id: 3,
    title: "تعمیرات",
    icon: <Bus size={32} className="text-white" />,
    path: "/dashboard/maintenances",
  },
  {
    id: 4,
    title: "پرداخت ها",
    icon: <Bus size={32} className="text-white" />,
    path: "/dashboard/payments",
  },
];
