import { RejectFormType } from "../_schemas/reject-form-schema";

export type RejectDrawerProps = {
  isOpen: boolean;
  isLoading: boolean;
  title: string;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: (data: RejectFormType) => void;
};
