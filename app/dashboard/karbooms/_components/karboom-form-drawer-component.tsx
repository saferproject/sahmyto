"use client";

import { SwipeableDrawer } from "@mui/material";
import { useSnackbar } from "notistack";
import KarboomFormComponent from "./karboom-form-component";
import { KarboomFormDrawerProps } from "../_types/karboom-form-drawer-props";
import { Truck } from "iconsax-reactjs";

export default function KarboomFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: KarboomFormDrawerProps) {
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
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="flex w-full min-h-0 flex-1 flex-col overflow-y-auto">
            <div className="mb-4 flex items-center gap-2">
              <Truck size={32} className="text-primary" />
              <h4 className="text-body text-lg font-bold">ایجاد کاربوم</h4>
            </div>
            <KarboomFormComponent onCancel={onClose} onSuccess={onSuccess} />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
