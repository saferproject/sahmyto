import Karboom from "@/app/_interfaces/karboom";
import { KarboomStoreTriggers } from "../_types/karboom-store-triggers";
import { USER_DEFAULTS } from "../../_constants/user-defaults";

export const KARBOOMS_STORE_DEFAULTS: Karboom & KarboomStoreTriggers = {
  id: 0,
  name: "",
  description: "",
  income: 0,
  expense: 0,
  owner: USER_DEFAULTS,
  plate: {
    first_number: 0,
    second_character: "",
    third_number: 0,
    fourth_number: 0,
  },
  type: "distance",
  smart_number: 0,
  image: "",
  isActionsDrawerOpen: false,
  isIncomeDrawerOpen: false,
  isExpenseDrawerOpen: false,
};
