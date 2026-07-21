import { BonusPenaltyType } from "./bonus-penalty-type";

export type DriverTipFormProps = {
  type: BonusPenaltyType;
  driverId: number;
  onSuccess: () => void;
};
