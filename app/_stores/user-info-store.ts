import { createStore } from "zustand/vanilla";

import User from "@/app/_interfaces/user";
import UserInfoStore from "../_types/user-info-store";
import { USER_INFO_STORE_DEFAULTS } from "../_constants/user-info-store-defaults";

export const createUserInfoStore = (
  initState: User = USER_INFO_STORE_DEFAULTS,
) => {
  return createStore<UserInfoStore>()((set) => ({
    ...initState,
    setPhone: (phone) => set(() => ({ phone })),
    setUser: (user) => {
      window.localStorage.setItem("user", JSON.stringify(user));
      return set(() => user);
    },
  }));
};
