"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { ActivityFormDrawerProps } from "../_types/activity-form-drawer-props";
import ActivityFormComponent from "./activity-form-component";

export default function DriverFormDrawerComponent({
  formState,
  activity,
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: ActivityFormDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-5 text-lg font-bold">
        {formState === "ADD" ? "افزودن راننده" : "ویرایش راننده"}
      </h2>
      <ActivityFormComponent
        formState={formState}
        activity={activity}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </FormDrawerComponent>
  );
}
