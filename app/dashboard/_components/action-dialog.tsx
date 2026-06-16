import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { ActionDialogProps } from "../_types/action-dialog-props";

export default function ActionDialog({
  isOpen,
  title,
  icon,
  description,
  actionButtons,
  persistant,
  onClose,
}: ActionDialogProps) {
  return (
    <Dialog open={isOpen} onClose={!persistant ? onClose : undefined} fullWidth>
      <div className="p-8">
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {icon}
          <h3 className="text-body text-xl font-bold">{title}</h3>
          <p className="text-body-light text-center">{description}</p>
        </DialogContent>
        <DialogActions>{actionButtons}</DialogActions>
      </div>
    </Dialog>
  );
}
