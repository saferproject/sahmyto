import { RejectFormType } from "../_schemas/reject-form-schema";

export type RejectDrawerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: RejectFormType) => void;
};
