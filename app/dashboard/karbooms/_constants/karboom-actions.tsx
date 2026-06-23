import {
  MoneyAdd,
  MoneyRemove,
  Moneys,
  Profile2User,
  Setting,
  User,
  Wallet1,
} from "iconsax-reactjs";
import { KarboomAction } from "../_types/karboom-action";

export const KARBOOM_ACTIONS: KarboomAction[] = [
  {
    label: "مدیریت ماه مالی",
    icon: <Wallet1 size="28" />,
    path: "/dashboard/karbooms/financial-managment",
  },
  {
    label: "تراز ماه مالی",
    icon: <Moneys size="28" />,
    path: "/dashboard/karbooms/financial-balance",
  },
  {
    label: "مدیریت شرکا",
    icon: <Profile2User size="28" />,
    path: "/dashboard/karbooms/partners-list",
  },
  {
    label: "مدیریت رانندگان",
    icon: <User size="28" />,
    path: "/dashboard/karbooms/drivers-list",
  },
  {
    label: "مدیریت درآمد ها",
    icon: <MoneyAdd size="28" />,
    path: "/dashboard/karbooms/incomes-list",
  },
  {
    label: "مدیریت هزینه ها",
    icon: <MoneyRemove size="28" />,
    path: "/dashboard/karbooms/expenses-list",
  },
  {
    label: "مدیریت تعمیرات دوره ای",
    icon: <Setting size="28" />,
    path: "/dashboard/karbooms/maintenance-list",
  },
];
