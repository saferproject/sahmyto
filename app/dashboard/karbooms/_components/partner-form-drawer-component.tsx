"use client";

import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

import PartnerFormComponent from "./partner-form-component";
import { PartnerFormDrawerProps } from "../_types/partner-form-drawer-props";

export default function PartnerFormDrawerComponent({
  formState,
  partner,
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: PartnerFormDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title={formState === "ADD" ? "افزودن مالک" : "ویرایش مالک"}
    >
      <PartnerFormComponent
        formState={formState}
        partner={partner}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </FormDrawerWithTitleComponent>
  );
}
