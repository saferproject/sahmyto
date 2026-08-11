import { SettlementData } from "./settlement-data";

export type SettlementStoreActions = {
  setSettlement: (settlement: SettlementData) => void;
  clearSettlement: () => void;
};