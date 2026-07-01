"use client";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import ThirdPartyInsuranceBannerComponent from "./_components/third-party-insurance-banner-component";
import { useState } from "react";
import ThirdPartyInsuranceListHeaderLayout from "./_layouts/third-party-insurance-list-header-layout";
import ThirdPartyInsuranceListLayout from "./_layouts/third-party-insurance-list-layout";

// TODO compare this page with incomes list page
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
      <ThirdPartyInsuranceBannerComponent />
      <SelectedKarboomInfoComponent />
      <ThirdPartyInsuranceListLayout
        onOpenIncomeForm={handleOpenThirdPartyInsuranceForm}
      />
      <ThirdPartyInsuranceFormDrawerComponent
        isOpen={isThirdPartyInsuranceFormDrawerOpen}
        onOpen={handleOpenThirdPartyInsuranceForm}
        onClose={handleCloseThirdPartyInsuranceForm}
      />
    </div>
  );
}
