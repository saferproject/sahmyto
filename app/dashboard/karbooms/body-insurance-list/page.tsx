"use client";

import { useState } from "react";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import BodyInsuranceListHeaderLayout from "./_layouts/body-insurance-list-header-layout";
import InsuranceBannerComponent from "../_components/insurance-banner-component";
import BodyInsuranceListLayout from "./_layouts/body-insurance-list-layout";

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
    <div className="mt-2 flex h-full w-full flex-col gap-4">
      <BodyInsuranceListHeaderLayout />
      <InsuranceBannerComponent />
      <SelectedKarboomInfoComponent />
      <BodyInsuranceListLayout
        onOpenBodyInsuranceForm={handleOpenBodyInsuranceForm}
      />
      {/* <BodyInsuranceFormDrawerComponent
        isOpen={isBodyInsuranceFormDrawerOpen}
        onOpen={handleOpenBodyInsuranceForm}
        onClose={handleCloseBodyInsuranceForm}
      /> */}
    </div>
  );
}
