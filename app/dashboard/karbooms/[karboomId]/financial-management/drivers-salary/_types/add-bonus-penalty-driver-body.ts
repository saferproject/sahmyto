import { DriverTipFormType } from "../_schemas/driver-tip-form-schema";
import { BonusPenaltyType } from "./bonus-penalty-type";

export type AddBonusPenaltyDriverBody = {
  type: BonusPenaltyType;
  amount: number;
  financialMonthId: number;
  driverId: number;
} & Omit<DriverTipFormType, "amount">;
