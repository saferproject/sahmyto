"use client";

import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

import KarboomFormComponent from "./karboom-form-component";
import { KarboomFormDrawerProps } from "../_types/karboom-form-drawer-props";

export default function KarboomFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: KarboomFormDrawerProps) {
  return (
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title="ایجاد کاربوم"
    >
      <KarboomFormComponent onCancel={onClose} onSuccess={onSuccess} />
    </FormDrawerWithTitleComponent>
  );
}
