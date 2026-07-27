"use client";

import { useState } from "react";

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
    <div className="pb-24 pt-26 flex h-full w-full flex-col gap-4">
      <ThirdPartyInsuranceListHeaderLayout />
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
