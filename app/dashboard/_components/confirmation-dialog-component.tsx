import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";

import ConfirmationDialog from "./confirmation-dialog";

export default function ConfirmationDialogComponent() {
  const confirmationDialogProps = useConfirmationDialogStore((state) => state);

  return <ConfirmationDialog {...confirmationDialogProps} />;
}
