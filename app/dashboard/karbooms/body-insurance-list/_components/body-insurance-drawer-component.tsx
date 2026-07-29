import FormDrawerComponent from "@/app/_components/form-drawer-component";

import { BodyInsuranceDrawerProps } from "../_types/body-insurance-drawer-props";

import BodyInsuranceFormComponent from "./body-insurance-form-component";

export default function BodyInsuranceDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: BodyInsuranceDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-6 w-full text-center font-bold">
        افزودن بیمه بدنه
      </h2>
      <BodyInsuranceFormComponent isOpen={isOpen} onSuccess={onClose} />
    </FormDrawerComponent>
  );
}
