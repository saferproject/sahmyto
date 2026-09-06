import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

import ThirdPartyInsuranceFormComponent from "./third-party-insurance-form-component";
import { ThirdPartyInsuranceDrawerProps } from "../_types/third-party-insurance-drawer-props";

export default function ThirdPartyInsuranceFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: ThirdPartyInsuranceDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title="افزودن بیمه شخص ثالث"
      titleClassName="text-body mb-6 w-full text-center font-bold"
    >
      <ThirdPartyInsuranceFormComponent isOpen={isOpen} onSuccess={onClose} />
    </FormDrawerWithTitleComponent>
  );
}
