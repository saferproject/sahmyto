"use client";

import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { InfoCircle } from "iconsax-reactjs";

import { useConfirmationDialogStore } from "../_providers/confirmation-dialog-provider";

export default function ConfirmationDialog() {
  const {
    isOpen,
    title,
    icon,
    mainDiscription,
    vector,
    extraDescription,
    confirmButtonTitle = "تایید",
    onConfirm,
    onClose,
  } = useConfirmationDialogStore((state) => state);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <div className="p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <h3>{title}</h3>
          </div>
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
