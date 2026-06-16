import { createStore } from "zustand/vanilla";

import { ActionDialogProps } from "../_types/action-dialog-props";

import ACTION_DIALOG_PROPS_DEFAULTS from "../_constants/action-dialog-props-defaults";
import ActionDialogStore from "../_types/action-dialog-store";


export const createActionDialogStore = (
  initState: ActionDialogProps = ACTION_DIALOG_PROPS_DEFAULTS,
) => {
  return createStore<ActionDialogStore>()((set) => ({
    ...initState,
    openDialog: () => set(() => ({ isOpen: true })),
    closeDialog: () => set(() => ({ isOpen: false })),
    setDialog: (props) => set(() => props),
    resetDialog: () => set(() => ACTION_DIALOG_PROPS_DEFAULTS),
  }));
};
