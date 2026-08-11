"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import KarboomsComponent from "./karbooms-component";

const KarboomActionsDrawerComponent = dynamic(
  () => import("./karboom-actions-drawer-component"),
  { ssr: false },
);
const KarboomFormDrawerComponent = dynamic(
  () => import("./karboom-form-drawer-component"),
  { ssr: false },
);
const PartnerFormDrawerComponent = dynamic(
  () => import("./partner-form-drawer-component"),
  { ssr: false },
);
const DriverFormDrawerComponent = dynamic(
  () => import("./driver-form-drawer-component"),
  { ssr: false },
);

export default function KarboomsPageContent() {
  const [loadedDrawers, setLoadedDrawers] = useState({
    actions: false,
    karboom: false,
    partner: false,
    driver: false,
  });
  const [isKarboomFormDrawerOpen, setKarboomFormDrawerOpen] = useState(false);
  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] = useState(false);
  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] = useState(false);

  const isActionsDrawerOpen = useKarboomsStore(
    (state) => state.isActionsDrawerOpen,
  );
  const openKarboomActionDrawer = useKarboomsStore(
    (state) => state.openKarboomActionDrawer,
  );
  const closeKarboomActionDrawer = useKarboomsStore(
    (state) => state.closeKarboomActionDrawer,
  );

  const handleOpenKarboomActionsDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, actions: true }));
    openKarboomActionDrawer();
  };

  const handleCloseKarboomActionsDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, actions: true }));
    closeKarboomActionDrawer();
  };

  const handleOpenKarboomFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, karboom: true }));
    setKarboomFormDrawerOpen(true);
  };

  const handleCloseKarboomFormDrawer = () => {
    setKarboomFormDrawerOpen(false);
  };

  const handleOpenPartnerFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, partner: true }));
    setPartnerFormDrawerOpen(true);
  };

  const handleClosePartnerFormDrawer = () => {
    setPartnerFormDrawerOpen(false);
  };

  const handleOpenDriverFormDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, driver: true }));
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverFormDrawer = () => {
    setDriverFormDrawerOpen(false);
  };

  const handleKarboomFormSuccess = () => {
    handleCloseKarboomFormDrawer();
    handleOpenPartnerFormDrawer();
  };

  const handlePartnerFormSuccess = () => {
    handleClosePartnerFormDrawer();
    handleOpenDriverFormDrawer();
  };

  return (
    <>
      <KarboomsComponent onAddKarboom={handleOpenKarboomFormDrawer} />
      {(loadedDrawers.actions || isActionsDrawerOpen) && (
        <KarboomActionsDrawerComponent
          isOpen={isActionsDrawerOpen}
          onOpen={handleOpenKarboomActionsDrawer}
          onClose={handleCloseKarboomActionsDrawer}
        />
      )}
      {loadedDrawers.karboom && (
        <KarboomFormDrawerComponent
          isOpen={isKarboomFormDrawerOpen}
          onOpen={handleOpenKarboomFormDrawer}
          onClose={handleCloseKarboomFormDrawer}
          onSuccess={handleKarboomFormSuccess}
        />
      )}
      {loadedDrawers.partner && (
        <PartnerFormDrawerComponent
          formState="ADD"
          isOpen={isPartnerFormDrawerOpen}
          onOpen={handleOpenPartnerFormDrawer}
          onClose={handleClosePartnerFormDrawer}
          onSuccess={handlePartnerFormSuccess}
        />
      )}
      {loadedDrawers.driver && (
        <DriverFormDrawerComponent
          formState="ADD"
          isOpen={isDriverFormDrawerOpen}
          onOpen={handleOpenDriverFormDrawer}
          onClose={handleCloseDriverFormDrawer}
          onSuccess={handleCloseDriverFormDrawer}
        />
      )}
    </>
  );
}
