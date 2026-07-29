"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import { MoneyRecive } from "iconsax-reactjs";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import DriverTipFormComponent from "./driver-tip-form-component";

import { DriverTipDrawerProps } from "../_types/driver-tip-drawer-props";
import { BonusPenaltyType } from "../_types/bonus-penalty-type";
import { BONUS_PENALTY_TYPE_FA } from "../_constants/bonus-penalty-type-fa";

export default function DriverTipDrawerComponent({
  isOpen,
  driverId,
  onOpen,
  onClose,
}: DriverTipDrawerProps) {
  const [bonusPenaltyType] = useState<BonusPenaltyType>("bonus");

  const handleSuccess = () => {
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="flex items-center gap-2">
        <MoneyRecive size="32" className="text-primary" />
        <h3>ثبت {BONUS_PENALTY_TYPE_FA[bonusPenaltyType]}</h3>
      </div>
      <div className="flex w-full items-center gap-2">
        <Button
          variant={bonusPenaltyType === "bonus" ? "contained" : "outlined"}
          size="large"
          color="success"
          fullWidth
        >
          ثبت انعام
        </Button>
        <Button
          variant={bonusPenaltyType === "penalty" ? "contained" : "outlined"}
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
    </FormDrawerComponent>
  );
}
