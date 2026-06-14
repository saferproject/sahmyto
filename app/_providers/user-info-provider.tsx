"use client";

import { createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import StoreProviderProps from "@/app/_interfaces/store-provider-props";
import { createUserInfoStore } from "../_stores/user-info-store";
import UserInfoStore from "../_types/user-info-store";

export type UserInfoStoreApi = ReturnType<typeof createUserInfoStore>;

export const UserInfoStoreContext = createContext<UserInfoStoreApi | undefined>(
  undefined,
);

export const UserInfoStoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createUserInfoStore());

  return (
    <UserInfoStoreContext.Provider value={store}>
      {children}
    </UserInfoStoreContext.Provider>
  );
};

export const useUserInfoStore = <T,>(
  selector: (store: UserInfoStore) => T,
): T => {
  const userInfoStoreContext = useContext(UserInfoStoreContext);
  if (!userInfoStoreContext) {
    throw new Error(
      `useUserInfoStore must be used within UserInfoStoreProvider`,
    );
  }

  return useStore(userInfoStoreContext, selector);
};
