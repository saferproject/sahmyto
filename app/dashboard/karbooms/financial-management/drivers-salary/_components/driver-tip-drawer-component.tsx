"use client";

import { Button } from "@mui/material";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import DriverTipFormComponent from "./driver-tip-form-component";

import { DriverTipDrawerProps } from "../_types/driver-tip-drawer-props";
import { BONUS_PENALTY_TYPE_FA } from "../_constants/bonus-penalty-type-fa";

export default function DriverTipDrawerComponent({
  isOpen,
  driverId,
  bonusPenaltyType,
  onOpen,
  onClose,
  onSwitchType,
}: DriverTipDrawerProps) {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h3 className="text-body mb-4 font-semibold">
        ثبت {BONUS_PENALTY_TYPE_FA[bonusPenaltyType]}
      </h3>
      <div className="mb-4 flex w-full items-center gap-2">
        <Button
          variant={bonusPenaltyType === "bonus" ? "contained" : "outlined"}
          size="large"
          color="success"
          onClick={onSwitchType}
          fullWidth
        >
          ثبت انعام
        </Button>
        <Button
          variant={bonusPenaltyType === "penalty" ? "contained" : "outlined"}
          size="large"
          color="error"
          onClick={onSwitchType}
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
