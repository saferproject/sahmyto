import { ActionDialogProps } from "../_types/action-dialog-props";

const ACTION_DIALOG_PROPS_DEFAULTS: ActionDialogProps = {
  isOpen: false,
  title: "",
  description: "",
  icon: <></>,
  actionButtons: <></>,
  onClose: () => {},
};

export default ACTION_DIALOG_PROPS_DEFAULTS;