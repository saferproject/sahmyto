"use client";

import { useState } from "react";
import { Fab } from "@mui/material";
import { Add, Truck } from "iconsax-reactjs";

import { useKarboomsStore } from "./_providers/karbooms-store-provider";

import KarboomsComponent from "./_components/karbooms-component";
import KarboomFormDrawerComponent from "./_components/karboom-form-drawer-component";
import PartnerFormDrawerComponent from "./_components/partner-form-drawer-component";
import DriverFormDrawerComponent from "./_components/driver-form-drawer-component";
import KarboomActionsDrawerComponent from "./_components/karboom-actions-drawer-component";

export default function KarboomsPage() {
  const [isKarboomFormDrawerOpen, setKarboomFormDrawerOpen] =
    useState<boolean>(false);
  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] =
    useState<boolean>(false);
  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);

  const {
    isActionsDrawerOpen,
    openKarboomActionDrawer,
    closeKarboomActionDrawer,
  } = useKarboomsStore((state) => state);

  const handleOpenKarboomFormDrawer = () => {
    setKarboomFormDrawerOpen(true);
  };

  const handleClosekarboomFormDrawer = () => {
    setKarboomFormDrawerOpen(false);
  };

  const handleOpenPartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(true);
  };

  const handleClosePartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(false);
  };

  const handleOpenDriverFormDrawer = () => {
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverFormDrawer = () => {
    setDriverFormDrawerOpen(false);
  };

  const handleKarboomFormSuccess = () => {
    handleClosekarboomFormDrawer();
    handleOpenPartnerFormDrawer();
  };

  const handlePartnerFormSuccess = () => {
    handleClosePartnerFormDrawer();
    handleOpenDriverFormDrawer();
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="mt-2 flex items-center gap-2">
        <Truck size={32} className="text-primary" />
        <h2 className="text-body w-full text-right text-xl font-semibold">
          لیست کاربوم ها
        </h2>
      </div>
      <KarboomsComponent onAddKarboom={handleOpenKarboomFormDrawer} />
      <KarboomActionsDrawerComponent
        isOpen={isActionsDrawerOpen}
        onOpen={openKarboomActionDrawer}
        onClose={closeKarboomActionDrawer}
      />
      <KarboomFormDrawerComponent
        isOpen={isKarboomFormDrawerOpen}
        onOpen={handleOpenKarboomFormDrawer}
        onClose={handleClosekarboomFormDrawer}
        onSuccess={handleKarboomFormSuccess}
      />
      <PartnerFormDrawerComponent
        isOpen={isPartnerFormDrawerOpen}
        onOpen={handleOpenPartnerFormDrawer}
        onClose={handleClosePartnerFormDrawer}
        onSuccess={handlePartnerFormSuccess}
      />
      <DriverFormDrawerComponent
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverFormDrawer}
        onClose={handleCloseDriverFormDrawer}
        onSuccess={handleCloseDriverFormDrawer}
      />
    </div>
  );
}
