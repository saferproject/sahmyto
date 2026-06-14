import { createStore } from "zustand/vanilla";

import Karboom from "@/app/_interfaces/karboom";
import { KARBOOMS_STORE_DEFAULTS } from "../_constants/karbooms-store-defaults";
import KarboomsStore from "../_types/karbooms-store-type";
import { KarboomStoreTriggers } from "../_types/karboom-store-triggers";

export const createKarboomsStore = (
  initState: Karboom & KarboomStoreTriggers = KARBOOMS_STORE_DEFAULTS,
) => {
  return createStore<KarboomsStore>()((set) => ({
    ...initState,
    setActiveKarboom: (karboom) => set(() => karboom),
    clearActiveKarboom: () => set(() => KARBOOMS_STORE_DEFAULTS),
    openKarboomActionDrawer: () => set(() => ({ isActionsDrawerOpen: true })),
    closeKarboomActionDrawer: () => set(() => ({ isActionsDrawerOpen: false })),
    openIncomeDrawer: () => set(() => ({ isIncomeDrawerOpen: true })),
    closeIncomeDrawer: () => set(() => ({ isIncomeDrawerOpen: false })),
    openExpenseDrawer: () => set(() => ({ isExpenseDrawerOpen: true })),
    closeExpenseDrawer: () => set(() => ({ isExpenseDrawerOpen: false })),
  }));
};
