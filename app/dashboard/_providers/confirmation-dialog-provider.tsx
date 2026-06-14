"use client";

import { createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import StoreProviderProps from "@/app/_interfaces/store-provider-props";
import { createConfirmationDialogStore } from "../_stores/confirmation-dialog-store";
import ConfirmationDialogStore from "../_types/confirmation-dialog-store";

export type ConfirmationDialogStoreApi = ReturnType<typeof createConfirmationDialogStore>;

export const ConfirmationDialogStoreContext = createContext<ConfirmationDialogStoreApi | undefined>(
  undefined,
);

export const ConfirmationDialogStoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createConfirmationDialogStore());

  return (
    <ConfirmationDialogStoreContext.Provider value={store}>
      {children}
    </ConfirmationDialogStoreContext.Provider>
  );
};

export const useConfirmationDialogStore = <T,>(
  selector: (store: ConfirmationDialogStore) => T,
): T => {
  const confirmationDialogStoreContext = useContext(ConfirmationDialogStoreContext);
  if (!confirmationDialogStoreContext) {
    throw new Error(
      `useConfirmationDialogStore must be used within ConfirmationDialogStoreProvider`,
    );
  }

  return useStore(confirmationDialogStoreContext, selector);
};
