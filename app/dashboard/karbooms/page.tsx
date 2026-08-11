"use client";

import { useState } from "react";

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
    <>
      <h2 className="text-body text-right text-lg font-semibold">
        لیست کاربوم ها
      </h2>
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
        formState="ADD"
        isOpen={isPartnerFormDrawerOpen}
        onOpen={handleOpenPartnerFormDrawer}
        onClose={handleClosePartnerFormDrawer}
        onSuccess={handlePartnerFormSuccess}
      />
      <DriverFormDrawerComponent
        formState="ADD"
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverFormDrawer}
        onClose={handleCloseDriverFormDrawer}
        onSuccess={handleCloseDriverFormDrawer}
      />
    </>
  );
}
