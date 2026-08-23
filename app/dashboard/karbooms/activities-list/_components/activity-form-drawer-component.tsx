"use client";

import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";
import { ActivityFormDrawerProps } from "../_types/activity-form-drawer-props";
import ActivityFormComponent from "./activity-form-component";

export default function ActivityFormDrawerComponent({
  formState,
  activity,
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: ActivityFormDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title={formState === "ADD" ? "افزودن فعالیت" : "ویرایش فعالیت"}
    >
      <ActivityFormComponent
        formState={formState}
        activity={activity}
        onCancel={onClose}
        onSuccess={onSuccess}
      />
    </FormDrawerWithTitleComponent>
  );
}
