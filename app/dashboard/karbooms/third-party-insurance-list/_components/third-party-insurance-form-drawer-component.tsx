import FormDrawerComponent from "@/app/_components/form-drawer-component";

import ThirdPartyInsuranceFormComponent from "./third-party-insurance-form-component";
import { ThirdPartyInsuranceDrawerProps } from "../_types/third-party-insurance-drawer-props";

export default function ThirdPartyInsuranceFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: ThirdPartyInsuranceDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-6 w-full text-center font-bold">
        افزودن بیمه شخص ثالث
      </h2>
      <ThirdPartyInsuranceFormComponent isOpen={isOpen} onSuccess={onClose} />
    </FormDrawerComponent>
  );
}
