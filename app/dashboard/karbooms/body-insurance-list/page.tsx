"use client";

import { useState } from "react";

import BodyInsuranceListHeaderLayout from "./_layouts/body-insurance-list-header-layout";
import BodyInsuranceListLayout from "./_layouts/body-insurance-list-layout";
import BodyInsuranceDrawerComponent from "./_components/body-insurance-drawer-component";
import ListFooterLayout from "../_layouts/PaymentsListFooterLayout";

export default function BodyInsurancePage() {
  const [isBodyInsuranceFormDrawerOpen, setBodyInsuranceFormDrawerOpen] =
    useState<boolean>(false);

  const handleOpenBodyInsuranceForm = () => {
    setBodyInsuranceFormDrawerOpen(true);
  };

  const handleCloseBodyInsuranceForm = () => {
    setBodyInsuranceFormDrawerOpen(false);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 pt-26 pb-24">
      <BodyInsuranceListHeaderLayout />
      <BodyInsuranceListLayout
        onOpenBodyInsuranceForm={handleOpenBodyInsuranceForm}
      />
      <BodyInsuranceDrawerComponent
        isOpen={isBodyInsuranceFormDrawerOpen}
        onOpen={handleOpenBodyInsuranceForm}
        onClose={handleCloseBodyInsuranceForm}
      />
    </div>
  );
}

/*

*/
