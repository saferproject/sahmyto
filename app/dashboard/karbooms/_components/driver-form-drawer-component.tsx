"use client";

import { SwipeableDrawer } from "@mui/material";
import { User } from "iconsax-reactjs";

import DriverFormComponent from "./driver-form-component";

import { DriverFormDrawerProps } from "../_types/driver-form-drawer-props";

export default function DriverFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: DriverFormDrawerProps) {
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
          <h2 className="text-body text-xl font-bold">افزودن راننده</h2>
          <DriverFormComponent onCancel={onClose} onSuccess={onSuccess} />
        </div>
      </div>
    </SwipeableDrawer>
  );
}
