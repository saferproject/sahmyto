import ConfirmationDialogProps from "@/app/dashboard/_interfaces/confirmation-dialog-props";

export const CONFIRMATION_DIALOG_PROPS_DEFAULTS: ConfirmationDialogProps = {
  isOpen: false,
  isPending: false,
  title: "",
  icon: <></>,
  mainDiscription: "",
  onConfirm: () => {},
  onClose: () => {},
};
