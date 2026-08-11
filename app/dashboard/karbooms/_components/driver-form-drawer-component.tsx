"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

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
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-5 text-lg font-bold">
        {formState === "ADD" ? "افزودن راننده" : "ویرایش راننده"}
      </h2>
      <DriverFormComponent
        formState={formState}
        driver={driver}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </FormDrawerComponent>
  );
}
