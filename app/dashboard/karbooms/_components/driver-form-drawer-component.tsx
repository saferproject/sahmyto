"use client";

import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

import DriverFormComponent from "./driver-form-component";

import { DriverFormDrawerProps } from "../_types/driver-form-drawer-props";

export default function DriverFormDrawerComponent({
  formState,
  driver,
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: DriverFormDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title={formState === "ADD" ? "افزودن راننده" : "ویرایش راننده"}
    >
      <DriverFormComponent
        formState={formState}
        driver={driver}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </FormDrawerWithTitleComponent>
  );
}
