"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createUserInfoStore } from "../_stores/user-info-store";
import UserInfoStore from "../_types/user-info-store";

export const [UserInfoStoreProvider, useUserInfoStore] =
  createStoreContext<UserInfoStore>(createUserInfoStore, "useUserInfoStore");
