import ConfirmationDialogProps from "@/app/dashboard/_interfaces/confirmation-dialog-props";

export const CONFIRMATION_DIALOG_PROPS_DEFAULTS: ConfirmationDialogProps = {
  isOpen: false,
  title: "",
  icon: <></>,
  mainDiscription: "",
  onConfirm: () => {},
  onClose: () => {},
};
