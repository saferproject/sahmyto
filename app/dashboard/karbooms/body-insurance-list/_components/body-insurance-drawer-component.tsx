import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { SwipeableDrawer } from "@mui/material";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

import { BodyInsuranceDrawerProps } from "../_types/body-insurance-drawer-props";

import useAddBodyInsuranceEndpoint from "../_hooks/use-add-body-insurance-endpoint";

import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";
import BodyInsuranceFormComponent from "./body-insurance-form-component";

export default function BodyInsuranceDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: BodyInsuranceDrawerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const karboomId = useKarboomsStore((state) => state.id);

  const {
    mutate: createBodyInsurance,
    isPending: creatingBodyInsurance,
    isSuccess: createdBodyInsuracne,
    isError: creatingBodyInsuranceFailed,
  } = useAddBodyInsuranceEndpoint();

  const handleSubmit = ({
    started_at,
    ended_at,
    ...other
  }: BodyInsuranceFormType) => {
    createBodyInsurance({
      ...other,
      karboomId,
      started_at: started_at.toISOString().split("T")[0],
      ended_at: ended_at.toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    if (createdBodyInsuracne) onClose();
  }, [createdBodyInsuracne]);

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
            <BodyInsuranceFormComponent onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
