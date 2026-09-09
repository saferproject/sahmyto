import { BonusPenaltyType } from "./bonus-penalty-type";

export type DriverTipDrawerProps = {
  isOpen: boolean;
  driverId: number;
  bonusPenaltyType: BonusPenaltyType;
  onOpen: () => void;
  onClose: () => void;
  onSwitchType: () => void;
};
