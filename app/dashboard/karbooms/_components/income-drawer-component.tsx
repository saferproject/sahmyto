"use client";

import { useEffect, useState } from "react";
import { SwipeableDrawer } from "@mui/material";

import { KarboomIncomeDrawerProps } from "../_types/karboom-income-drawer-props";
import { IncomeTypes } from "../_types/income-categories";

import IncomeDrawerHeaderComponent from "./income-drawer-header-component";
import IncomeDrawerTypeListComponent from "./income-drawer-type-list-component";
import IncomeDrawerFormComponent from "./income-drawer-form-component";

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
    onClose();
    setIncomeType(null);
  };

  useEffect(() => {
    setIncomeType(null);
  }, [isOpen]);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="mb-4 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
            {incomeType ? (
              <>
                <IncomeDrawerHeaderComponent incomeType={incomeType} />
                <IncomeDrawerFormComponent
                  isOpen={isOpen}
                  karboomId={karboomId}
                  incomeType={incomeType}
                  onSuccess={handleSuccess}
                />
              </>
            ) : (
              <IncomeDrawerTypeListComponent onTypeSelect={handleTypeSelect} />
            )}
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
