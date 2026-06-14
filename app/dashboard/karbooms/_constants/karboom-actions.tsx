import {
  EmptyWalletChange,
  MoneyAdd,
  MoneyRemove,
  Profile2User,
  Setting,
  User,
} from "iconsax-reactjs";
import { KarboomAction } from "../_types/karboom-action";

export const KARBOOM_ACTIONS: KarboomAction[] = [
  {
    label: "مدیریت رانندگان",
    icon: <User size="24" />,
    path: "/dashboard/karbooms/drivers-list",
  },
  {
    label: "مدیریت شرکا",
    icon: <Profile2User size="24" />,
    path: "/dashboard/karbooms/partners-list",
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
  {
    label: "مدیریت تعمیرات دوره ای",
    icon: <Setting size="24" />,
    path: "/dashboard/karbooms/maintenance-list",
  },
  {
    label: "مدیریت واریز ها",
    icon: <EmptyWalletChange size="24" />,
    path: "/dashboard/karbooms/",
  },
];
