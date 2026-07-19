import {
  Car,
  Health,
  MoneyAdd,
  MoneyRemove,
  Profile2User,
  Setting,
  User,
  Wallet1,
} from "iconsax-reactjs";

import { KarboomAction } from "../_types/karboom-action";

export const KARBOOM_ACTIONS: KarboomAction[] = [
  {
    label: "مدیریت ماه مالی",
    icon: <Wallet1 size="24" />,
    path: "/dashboard/karbooms/financial-management",
  },
  {
    label: "مدیریت شرکا",
    icon: <Profile2User size="24" />,
    path: "/dashboard/karbooms/partners-list",
  },
  {
    label: "مدیریت رانندگان",
    icon: <User size="24" />,
    path: "/dashboard/karbooms/drivers-list",
  },
  {
    label: "مدیریت درآمد ها",
    icon: <MoneyAdd size="24" />,
    path: "/dashboard/karbooms/incomes-list",
  },
  {
    label: "مدیریت هزینه ها",
    icon: <MoneyRemove size="24" />,
    path: "/dashboard/karbooms/expenses-list",
  },
  // {
  //   label: "مدیریت تعمیرات دوره ای",
  //   icon: <Setting size="24" />,
  //   path: "/dashboard/karbooms/maintenance-list",
  // },
  {
    label: "مدیریت بیمه شخص ثالث",
    icon: <Health size="24" />,
    path: "/dashboard/karbooms/third-party-insurance-list",
  },
  {
    label: "مدیریت بیمه بدنه",
    icon: <Car size="24" />,
    path: "/dashboard/karbooms/body-insurance-list",
  },
];
