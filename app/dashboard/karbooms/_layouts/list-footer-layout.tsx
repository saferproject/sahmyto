import { Fab } from "@mui/material";
import { Add } from "iconsax-reactjs";

import { ListFooterProps } from "../_types/list-footer-props";

export default function ListFooterLayout({ onAdd }: ListFooterProps) {
  return (
    <Fab
      sx={{
        position: "fixed",
        bottom: "calc(32px + env(safe-area-inset-bottom))",
        left: "32px",
        zIndex: 10,
      }}
      color="primary"
      onClick={onAdd}
    >
      <Add size={32} className="text-white" />
    </Fab>
  );
}
