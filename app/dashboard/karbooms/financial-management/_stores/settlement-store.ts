import { createStore } from "zustand/vanilla";
import { SettlementData } from "../_types/settlement-data";
import { SettlementStore } from "../_types/settlement-store";
import { SETTLEMENT_STORE_DEFAULTS } from "../_constants/settlement-store-defaults";

export const createSettlementStore = (
  initState: SettlementData = SETTLEMENT_STORE_DEFAULTS,
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
