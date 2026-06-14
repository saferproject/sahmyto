"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore, type StoreApi } from "zustand";

/**
 * Builds the "vanilla zustand store + React Context provider + selector hook"
 * trio used across the app, so each feature store doesn't re-implement the
 * boilerplate (and its copy-pasted error messages).
 *
 * Usage:
 *   const [FooStoreProvider, useFooStore] =
 *     createStoreContext<FooStore>(createFooStore, "useFooStore");
 */
export function createStoreContext<TStore>(
  createStore: () => StoreApi<TStore>,
  hookName: string,
) {
  const Context = createContext<StoreApi<TStore> | undefined>(undefined);

  const Provider = ({ children }: { children: ReactNode }) => {
    const [store] = useState(createStore);

    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useStoreContext = <T,>(selector: (store: TStore) => T): T => {
    const context = useContext(Context);

    if (!context) {
      throw new Error(`${hookName} must be used within its store provider`);
    }

    return useStore(context, selector);
  };

  return [Provider, useStoreContext, Context] as const;
}
