"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

import PartnerFormComponent from "./partner-form-component";
import { PartnerFormDrawerProps } from "../_types/partner-form-drawer-props";

export default function PartnerFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: PartnerFormDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-5 text-lg font-bold">افزودن مالک</h2>
      <PartnerFormComponent onCancel={onClose} onSuccess={onSuccess} />
    </FormDrawerComponent>
  );
}
