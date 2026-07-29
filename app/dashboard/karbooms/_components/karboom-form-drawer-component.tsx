"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

import KarboomFormComponent from "./karboom-form-component";
import { KarboomFormDrawerProps } from "../_types/karboom-form-drawer-props";

export default function KarboomFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: KarboomFormDrawerProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body mb-5 text-lg font-bold">ایجاد کاربوم</h4>
      <KarboomFormComponent onCancel={onClose} onSuccess={onSuccess} />
    </FormDrawerComponent>
  );
}
