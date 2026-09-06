import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

import { BodyInsuranceDrawerProps } from "../_types/body-insurance-drawer-props";

import BodyInsuranceFormComponent from "./body-insurance-form-component";

export default function BodyInsuranceDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: BodyInsuranceDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title="افزودن بیمه بدنه"
      titleClassName="text-body mb-6 w-full text-center font-bold"
    >
      <BodyInsuranceFormComponent isOpen={isOpen} onSuccess={onClose} />
    </FormDrawerWithTitleComponent>
  );
}
