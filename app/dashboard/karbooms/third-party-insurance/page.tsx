import { DocumentMedicine } from "@solar-icons/react/ssr";

import KarboomInfoBanner from "../_components/karboom-info-banner";
import ThirdPartyInsuranceFormComponent from "./_components/third-party-insurance-form-component";

export default function ThirdPartyInsurancePage() {
  return (
    <>
      <div className="mb-4 flex w-full items-center gap-2">
        <DocumentMedicine className="text-heading" size={24} weight="Broken" />
        <h2 className="text-body text-xl font-bold">افزودن بیمه شخص ثالث</h2>
      </div>
      <KarboomInfoBanner />
      <ThirdPartyInsuranceFormComponent />
    </>
  );
}
