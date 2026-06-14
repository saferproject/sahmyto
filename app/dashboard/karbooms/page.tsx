"use client";

import { useState } from "react";
import { Fab } from "@mui/material";
import { Add } from "iconsax-reactjs";

import { useKarboomsStore } from "./_providers/karbooms-store-provider";

import KarboomsComponent from "./_components/karbooms-component";
import KarboomFormDrawerComponent from "./_components/karboom-form-drawer-component";
import PartnerFormDrawerComponent from "./_components/partner-from-drawer-component";
import DriverFormDrawerComponent from "./_components/driver-form-drawer-component";
import KarboomActionsDrawerComponent from "./_components/karboom-actions-drawer-component";
import IncomeDrawerComponent from "./_components/income-drawer-component";
import ExpenseDrawerComponent from "./_components/expense-drawer-component";

export default function KarboomsPage() {
  const [isKarboomFormDrawerOpen, setKarboomFormDrawerOpen] =
    useState<boolean>(false);
  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] =
    useState<boolean>(false);
  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);

  const {
    isActionsDrawerOpen,
    isIncomeDrawerOpen,
    isExpenseDrawerOpen,
    openKarboomActionDrawer,
    openIncomeDrawer,
    openExpenseDrawer,
    closeKarboomActionDrawer,
    closeIncomeDrawer,
    closeExpenseDrawer,
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
    <div className="w-full h-full overflow-y-auto">
      <h2 className="text-body w-full text-right text-xl font-semibold">
        لیست کاربوم ها
      </h2>
      <KarboomsComponent />
      <KarboomActionsDrawerComponent
        isOpen={isActionsDrawerOpen}
        onOpen={openKarboomActionDrawer}
        onClose={closeKarboomActionDrawer}
      />
      <IncomeDrawerComponent
        isOpen={isIncomeDrawerOpen}
        onOpen={openIncomeDrawer}
        onClose={closeIncomeDrawer}
      />
      <ExpenseDrawerComponent
        isOpen={isExpenseDrawerOpen}
        onOpen={openExpenseDrawer}
        onClose={closeExpenseDrawer}
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
      <Fab
        sx={{
          position: "fixed",
          bottom: "128px",
          left: "32px",
          zIndex: 10,
        }}
        color="primary"
        onClick={handleOpenKarboomFormDrawer}
      >
        <Add size={32} className="text-white" />
      </Fab>
    </div>
  );
}
