import { SettlementFormType } from "../_schemas/settlement-form-schema";

export type SettlementDrawerProps = {
  isOpen: boolean;
  isLoading?: boolean;
  title: string;
  memberTitle: string;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: SettlementFormType) => void;
};
