import { createStore } from "zustand/vanilla";

import ConfirmationDialogProps from "@/app/dashboard/_interfaces/confirmation-dialog-props";
import { CONFIRMATION_DIALOG_PROPS_DEFAULTS } from "../_constants/confirmation-dialog-props-defaults";
import ConfirmationDialogStore from "../_types/confirmation-dialog-store";

export const createConfirmationDialogStore = (
  initState: ConfirmationDialogProps = CONFIRMATION_DIALOG_PROPS_DEFAULTS,
) => {
  return createStore<ConfirmationDialogStore>()((set) => ({
    ...initState,
    openDialog: () => set(() => ({ isOpen: true })),
    closeDialog: () => set(() => ({ isOpen: false })),
    setDialog: (props) => set(() => props),
  }));
};
