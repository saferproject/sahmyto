"use client";

import { type ReactNode } from "react";
import { SwipeableDrawer } from "@mui/material";

type FormDrawerComponentProps = {
  children: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function FormDrawerComponent({
  children,
  isOpen,
  onOpen,
  onClose,
}: FormDrawerComponentProps) {
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
        <div className="bg-secondary-light absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full" />
        <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto">
          {children}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
