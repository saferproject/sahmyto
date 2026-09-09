import { createStore } from "zustand/vanilla";
import { SettlementStore } from "../_types/settlement-store";
import { SETTLEMENT_STORE_DEFAULTS } from "../_constants/settlement-store-defaults";
import { SettlementStoreData } from "../_types/settlement-store-data";

export const createSettlementStore = (
  initState: SettlementStoreData = SETTLEMENT_STORE_DEFAULTS,
) => {
  return createStore<SettlementStore>()((set) => ({
    ...initState,
    setSettlement(settlement) {
      return set(() => settlement);
    },
    clearSettlement() {
      return set(() => SETTLEMENT_STORE_DEFAULTS);
    },
  }));
};
