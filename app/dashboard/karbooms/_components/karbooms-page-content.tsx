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
const PartnerListDrawerComponent = dynamic(
  () => import("./partner-list-drawer-component"),
  { ssr: false },
);
const DriverListDrawerComponent = dynamic(
  () => import("./driver-list-drawer-component"),
  { ssr: false },
);

export default function KarboomsPageContent() {
  const [loadedDrawers, setLoadedDrawers] = useState({
    actions: false,
    karboom: false,
    partnerList: false,
    driverList: false,
  });
  const [isKarboomFormDrawerOpen, setKarboomFormDrawerOpen] = useState(false);
  const [isPartnerListDrawerOpen, setPartnerListDrawerOpen] = useState(false);
  const [isDriverListDrawerOpen, setDriverListDrawerOpen] = useState(false);

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

  const handleOpenPartnerListDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, partnerList: true }));
    setPartnerListDrawerOpen(true);
  };

  const handleClosePartnerListDrawer = () => {
    setPartnerListDrawerOpen(false);
  };

  const handleSkipPartnerListDrawer = () => {
    handleClosePartnerListDrawer();
    handleOpenDriverListDrawer();
  };

  const handleOpenDriverListDrawer = () => {
    setLoadedDrawers((current) => ({ ...current, driverList: true }));
    setDriverListDrawerOpen(true);
  };

  const handleCloseDriverListDrawer = () => {
    setDriverListDrawerOpen(false);
  };

  const handleKarboomFormSuccess = () => {
    handleCloseKarboomFormDrawer();
    handleOpenPartnerListDrawer();
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
      {loadedDrawers.partnerList && (
        <PartnerListDrawerComponent
          isOpen={isPartnerListDrawerOpen}
          onOpen={handleOpenPartnerListDrawer}
          onClose={handleClosePartnerListDrawer}
          onSkip={handleSkipPartnerListDrawer}
        />
      )}
      {loadedDrawers.driverList && (
        <DriverListDrawerComponent
          isOpen={isDriverListDrawerOpen}
          onOpen={handleOpenDriverListDrawer}
          onClose={handleCloseDriverListDrawer}
        />
      )}
    </>
  );
}
