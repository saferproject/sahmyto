"use client";

import type { ReactNode } from "react";

import FormDrawerComponent from "./form-drawer-component";

interface FormDrawerWithTitleProps {
  children: ReactNode;
  title: string;
  titleClassName?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function FormDrawerWithTitleComponent({
  children,
  title,
  titleClassName = "text-body mb-5 text-lg font-bold",
  isOpen,
  onOpen,
  onClose,
}: FormDrawerWithTitleProps) {
  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </FormDrawerComponent>
  );
}
