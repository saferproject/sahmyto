"use client";

import { useEffect, useState } from "react";
import { SwipeableDrawer } from "@mui/material";
import { useSnackbar } from "notistack";

import { KarboomIncomeDrawerProps } from "../_types/karboom-income-drawer-props";
import { IncomeTypes } from "../_types/income-categories";

import useCreateIncomeEndpoint from "../_hooks/create-income-endpoint";

import { IncomeFormType } from "../_schemas/income-form-schema";

import IncomeDrawerHeaderComponent from "./income-drawer-header-component";
import IncomeDrawerTypeListComponent from "./income-drawer-type-list-component";
import IncomeDrawerFormComponent from "./income-drawer-form-component";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";

export default function IncomeDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomIncomeDrawerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const [incomeType, setIncomeType] = useState<IncomeTypes | null>(null);

  const karboomId = useKarboomsStore((state) => state.id);

  const {
    mutate: createIncome,
    isPending: creatingIncome,
    isSuccess: createdIncome,
    isError: creatingIncomeFailed,
  } = useCreateIncomeEndpoint();

  const handleSubmit = ({
    reciever,
    started_at,
    ended_at,
    image,
    ...other
  }: IncomeFormType) => {
    if (incomeType)
      createIncome({
        ...other,
        type: incomeType,
        receiver_id: reciever.member.id,
        karboom_id: karboomId,
        started_at: started_at.toISOString().split("T")[0],
        ended_at: ended_at.toISOString().split("T")[0],
      });
    else
      enqueueSnackbar({
        variant: "warning",
        message: "نوع درآمد را انتخاب کنید",
      });
  };

  const handleTypeSelect = (type: IncomeTypes) => {
    setIncomeType(type);
  };

  useEffect(() => {
    if (createdIncome) {
      onClose();
      setIncomeType(null);
    }
  }, [createdIncome]);

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
      <div className="relative h-150 w-full px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="mb-4 flex w-full flex-col overflow-y-auto">
            {incomeType ? (
              <>
                <IncomeDrawerHeaderComponent incomeType={incomeType} />
                <IncomeDrawerFormComponent
                  isOpen={isOpen}
                  karboomId={karboomId}
                  incomeType={incomeType}
                  onSubmit={handleSubmit}
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
