import {
  Car,
  Health,
  Profile2User,
  ProgrammingArrows,
  User,
  Wallet1,
  WalletAdd1,
  WalletMinus,
} from "iconsax-reactjs";

import { KarboomAction } from "../_types/karboom-action";

export const KARBOOM_ACTIONS: KarboomAction[] = [
  {
    label: "مدیریت ماه مالی",
    icon: <Wallet1 size="24" />,
    path: "financial-management",
  },
  {
    label: "مدیریت مالکین",
    icon: <Profile2User size="24" />,
    path: "partners-list",
  },
  {
    label: "مدیریت رانندگان",
    icon: <User size="24" />,
    path: "drivers-list",
  },
  {
    label: "مدیریت درآمد ها",
    icon: <WalletAdd1 size="24" />,
    path: "incomes-list",
  },
  {
    label: "مدیریت هزینه ها",
    icon: <WalletMinus size="24" />,
    path: "expenses-list",
  },
  {
    label: "مدیریت دریافتی و پرداختی ها",
    icon: <ProgrammingArrows size="24" />,
    path: "payments-list",
  },
  {
    label: "مدیریت بیمه شخص ثالث",
    icon: <Health size="24" />,
    path: "third-party-insurance-list",
  },
  {
    label: "مدیریت بیمه بدنه",
    icon: <Car size="24" />,
    path: "body-insurance-list",
  },
];
