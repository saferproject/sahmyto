"use client";

import { useEffect, useState } from "react";
import { Button, SwipeableDrawer } from "@mui/material";

import { DriverTipDrawerProps } from "../_types/driver-tip-drawer-props";
import { useFinancialMonthStore } from "../../_providers/financial-managment-store-provider";
import { MoneyRecive } from "iconsax-reactjs";
import DriverTipFormComponent from "./driver-tip-form-component";
import { BonusPenaltyType } from "../_types/bonus-penalty-type";
import { BONUS_PENALTY_TYPE_FA } from "../_constants/bonus-penalty-type-fa";

export default function DriverTipDrawerComponent({
  isOpen,
  driverId,
  onOpen,
  onClose,
}: DriverTipDrawerProps) {
  const [bonusPenaltyType, setBonusPenaltyType] =
    useState<BonusPenaltyType>("bonus");
  


  const handleChangeType = (type: BonusPenaltyType) => {
    setBonusPenaltyType(type);
  };

  const handleSuccess = () => {
    onClose();
  };

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
            <div className="flex items-center gap-2">
              <MoneyRecive size="32" className="text-primary" />
              <h3>ثبت {BONUS_PENALTY_TYPE_FA[bonusPenaltyType]}</h3>
            </div>
            <div className="flex w-full items-center gap-2">
              <Button
                variant={
                  bonusPenaltyType === "bonus" ? "contained" : "outlined"
                }
                size="large"
                color="success"
                fullWidth
              >
                ثبت انعام
              </Button>
              <Button
                variant={
                  bonusPenaltyType === "penalty" ? "contained" : "outlined"
                }
                size="large"
                color="error"
                fullWidth
              >
                ثبت جریمه
              </Button>
            </div>
            <DriverTipFormComponent
              type={bonusPenaltyType}
              driverId={driverId}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
