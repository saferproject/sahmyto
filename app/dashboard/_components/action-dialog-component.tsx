import { useActionDialogStore } from "../_providers/action-dialog-provider";
import ActionDialog from "./action-dialog";

export default function ActionDialogComponent() {
  const {
    openDialog: openActionDialog,
    closeDialog: closeActionDialog,
    setDialog: setActionDialog,
    ...actionDialogProps
  } = useActionDialogStore((state) => state);

  return (
    actionDialogProps.isOpen && (
      <ActionDialog {...actionDialogProps} />
    )
  );
}
