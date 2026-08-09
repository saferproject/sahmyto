import ConfirmationDialogProps from "../_interfaces/confirmation-dialog-props";

type ConfirmationDialogStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
  startPending: () => void;
  stopPending: () => void;
  setDialog: (props: ConfirmationDialogProps) => void;
}

export default ConfirmationDialogStoreActions;