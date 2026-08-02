"use client";

import { useState } from "react";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

import { KarboomIncomeDrawerProps } from "../_types/karboom-income-drawer-props";
import { IncomeTypes } from "../_types/income-categories";

import IncomeDrawerHeaderComponent from "./income-drawer-header-component";
import IncomeDrawerTypeListComponent from "./income-drawer-type-list-component";
import IncomeFormComponent from "./income-form-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

export default function IncomeDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomIncomeDrawerProps) {
  const [incomeType, setIncomeType] = useState<IncomeTypes | null>(null);

  const karboomId = useKarboomsStore((state) => state.id);

  const handleTypeSelect = (type: IncomeTypes) => {
    setIncomeType(type);
  };

  const handleSuccess = () => {
    setIncomeType(null);
    onClose();
  };

  const handleClose = () => {
    setIncomeType(null);
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
      {incomeType ? (
        <>
          <IncomeDrawerHeaderComponent incomeType={incomeType} />
          <IncomeFormComponent
            isOpen={isOpen}
            karboomId={karboomId}
            incomeType={incomeType}
            onSuccess={handleSuccess}
          />
        </>
      ) : (
        <IncomeDrawerTypeListComponent onTypeSelect={handleTypeSelect} />
      )}
    </FormDrawerComponent>
  );
}
