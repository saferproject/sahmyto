import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { CloseCircle, InfoCircle } from "iconsax-reactjs";

import ConfirmationDialogProps from "../_interfaces/confirmation-dialog-props";

export default function ConfirmationDialog({
  isOpen,
  title,
  icon,
  mainDiscription,
  vector,
  extraDescription,
  confirmButtonTitle = "تایید",
  onConfirm,
  onClose,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className="p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-2 items-center">
            {icon}
            <h3>{title}</h3>
          </div>
          {/* <CloseCircle size="24" className="text-red-500" onClick={onClose} /> */}
        </div>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {vector}
          <p className="text-body font-semibold">{mainDiscription}</p>
          {extraDescription && (
            <div className="text-body-light flex gap-2">
              <InfoCircle size={24} />
              <p className="text-sm">{extraDescription}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>انصراف</Button>
          <Button variant="contained" onClick={onConfirm}>
            {confirmButtonTitle}
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
