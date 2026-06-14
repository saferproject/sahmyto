import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";
import ConfirmationDialog from "./confirmation-dialog";

export default function ConfirmationDialogComponent() {
  const {
    openDialog: openConfirmationDialog,
    closeDialog: closeConfirmationDialog,
    setDialog: setConfirmationDialog,
    ...confirmationDialogProps
  } = useConfirmationDialogStore((state) => state);

  return (
    confirmationDialogProps.isOpen && (
      <ConfirmationDialog {...confirmationDialogProps} />
    )
  );
}
