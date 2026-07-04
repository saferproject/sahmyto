"use client";

import { useState } from "react";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import InsuranceBannerComponent from "../_components/insurance-banner-component";
import ThirdPartyInsuranceFormDrawerComponent from "./_components/third-party-insurance-form-drawer-component";

import ThirdPartyInsuranceListHeaderLayout from "./_layouts/third-party-insurance-list-header-layout";
import ThirdPartyInsuranceListLayout from "./_layouts/third-party-insurance-list-layout";

export default function ThirdPartyInsurancePage() {
  const [
    isThirdPartyInsuranceFormDrawerOpen,
    setThirdPartyInsuranceFormDrawerOpen,
  ] = useState<boolean>(false);

  const handleOpenThirdPartyInsuranceForm = () => {
    setThirdPartyInsuranceFormDrawerOpen(true);
  };

  const handleCloseThirdPartyInsuranceForm = () => {
    setThirdPartyInsuranceFormDrawerOpen(false);
  };

  return (
    <div className="mt-2 flex h-full w-full flex-col gap-4">
      <ThirdPartyInsuranceListHeaderLayout />
      <InsuranceBannerComponent />
      <SelectedKarboomInfoComponent />
      <ThirdPartyInsuranceListLayout
        onOpenThirdPartyInsuranceForm={handleOpenThirdPartyInsuranceForm}
      />
      <ThirdPartyInsuranceFormDrawerComponent
        isOpen={isThirdPartyInsuranceFormDrawerOpen}
        onOpen={handleOpenThirdPartyInsuranceForm}
        onClose={handleCloseThirdPartyInsuranceForm}
      />
    </div>
  );
}
