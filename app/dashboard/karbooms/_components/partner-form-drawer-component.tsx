"use client";

import { SwipeableDrawer } from "@mui/material";
import { useSnackbar } from "notistack";

import PartnerFormComponent from "./partner-form-component";
import { Profile2User } from "iconsax-reactjs";
import { PartnerFormDrawerProps } from "../_types/partner-form-drawer-props";

export default function PartnerFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: PartnerFormDrawerProps) {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 pt-12 pb-8">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-5 overflow-y-auto">
          <h2 className="text-body text-xl font-bold">افزودن شریک</h2>
          <PartnerFormComponent onCancel={onClose} onSuccess={onSuccess} />
        </div>
      </div>
    </SwipeableDrawer>
  );
}
