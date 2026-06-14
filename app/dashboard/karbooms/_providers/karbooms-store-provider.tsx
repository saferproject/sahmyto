"use client";

import { createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import StoreProviderProps from "@/app/_interfaces/store-provider-props";
import { createKarboomsStore } from "../_store/karbooms-store";
import KarboomsStore from "../_types/karbooms-store-type";

export type KarboomsStoreApi = ReturnType<typeof createKarboomsStore>;

export const KarboomsStoreContext = createContext<KarboomsStoreApi | undefined>(
  undefined,
);

export const KarboomsStoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createKarboomsStore());

  return (
    <KarboomsStoreContext.Provider value={store}>
      {children}
    </KarboomsStoreContext.Provider>
  );
};

export const useKarboomsStore = <T,>(
  selector: (store: KarboomsStore) => T,
): T => {
  const karboomsStoreContext = useContext(KarboomsStoreContext);

  if (!karboomsStoreContext) {
    throw new Error(
      `useUserInfoStore must be used within UserInfoStoreProvider`,
    );
  }

  return useStore(karboomsStoreContext, selector);
};
