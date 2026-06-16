import { ActionDialogProps } from "./action-dialog-props";

export type ActionDialogStoreActions = {
  openDialog: () => void;
  closeDialog: () => void;
  setDialog: (props: ActionDialogProps) => void,
  resetDialog: () => void;
}