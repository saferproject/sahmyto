"use client";

import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";
import { ContactFormDrawerProps } from "../_types/contact-form-drawer-props";
import ContactFormComponent from "./contact-form-component";

export default function ContactFormDrawerComponent({
  formState,
  contact,
  initialPhone,
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: ContactFormDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title={formState === "ADD" ? "افزودن مخاطب" : "ویرایش مخاطب"}
    >
      <ContactFormComponent
        formState={formState}
        contact={contact}
        initialPhone={initialPhone}
        onSuccess={onSuccess}
      />
    </FormDrawerWithTitleComponent>
  );
}
