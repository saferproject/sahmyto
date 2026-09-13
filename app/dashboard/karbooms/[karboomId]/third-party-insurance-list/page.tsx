"use client";

import { THIRD_PARTY_INSURANCE_FILTERS } from "./_constants/third-party-insurance-filters";

import { useState } from "react";

import ThirdPartyInsuranceFormDrawerComponent from "./_components/third-party-insurance-form-drawer-component";

import ThirdPartyInsuranceListLayout from "./_layouts/third-party-insurance-list-layout";
import ListHeaderLayout from "../../_layouts/list-header-layout";

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
    <>
      <ListHeaderLayout
        filters={THIRD_PARTY_INSURANCE_FILTERS}
        title="بیمه شخص ثالث"
      />
      <ThirdPartyInsuranceListLayout
        onOpenThirdPartyInsuranceForm={handleOpenThirdPartyInsuranceForm}
      />
      <ThirdPartyInsuranceFormDrawerComponent
        isOpen={isThirdPartyInsuranceFormDrawerOpen}
        onOpen={handleOpenThirdPartyInsuranceForm}
        onClose={handleCloseThirdPartyInsuranceForm}
      />
    </>
  );
}
