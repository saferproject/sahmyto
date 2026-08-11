import { useActionDialogStore } from "../_providers/action-dialog-provider";
import ActionDialog from "./action-dialog";

export default function ActionDialogComponent() {
  const actionDialogStore = useActionDialogStore((state) => state);
  const actionDialogProps = {
    isOpen: actionDialogStore.isOpen,
    title: actionDialogStore.title,
    icon: actionDialogStore.icon,
    description: actionDialogStore.description,
    actionButtons: actionDialogStore.actionButtons,
    persistant: actionDialogStore.persistant,
    onClose: actionDialogStore.onClose,
  };

  return actionDialogProps.isOpen && <ActionDialog {...actionDialogProps} />;
}
