import { SettlementStoreData } from "./settlement-store-data";

export type SettlementStoreActions = {
  setSettlement: (settlement: SettlementStoreData) => void;
  clearSettlement: () => void;
};
