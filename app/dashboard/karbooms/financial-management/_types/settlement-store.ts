import { SettlementData } from "./settlement-data";
import { SettlementStoreActions } from "./settlement-store-actions";

export type SettlementStore = SettlementData & SettlementStoreActions;
