import ConfirmationDialogProps from "../_interfaces/confirmation-dialog-props";

type ConfirmationDialogStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setDialog: (props: ConfirmationDialogProps) => void;
}

export default ConfirmationDialogStoreActions;