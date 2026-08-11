import { useActionDialogStore } from "../_providers/action-dialog-provider";
import ActionDialog from "./action-dialog";
import { useShallow } from "zustand/react/shallow";

export default function ActionDialogComponent() {
  const actionDialogProps = useActionDialogStore(
    useShallow(
      ({
        isOpen,
        title,
        icon,
        description,
        actionButtons,
        persistant,
        onClose,
      }) => ({
        isOpen,
        title,
        icon,
        description,
        actionButtons,
        persistant,
        onClose,
      }),
    ),
  );

  return actionDialogProps.isOpen && <ActionDialog {...actionDialogProps} />;
}
