import { useEffect } from "react";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";
import { SwipeableDrawer } from "@mui/material";
import { DocumentText } from "iconsax-reactjs";
import ThirdPartyInsuranceFormComponent from "./third-party-insurance-form-component";
import { ThirdPartyInsuranceDrawerProps } from "../_types/third-party-insurance-drawer-props";
import useAddThirdPartyInsuranceEndpoint from "../_hooks/use-add-third-party-insurance-endpoint";

export default function ThirdPartyInsuranceFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: ThirdPartyInsuranceDrawerProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    mutate: createIncome,
    isPending: creatingIncome,
    isSuccess: createdIncome,
    isError: creatingIncomeFailed,
  } = useAddThirdPartyInsuranceEndpoint();

  const handleSubmit = ({
    started_at,
    ended_at,
    ...other
  }: ThirdPartyInsuranceFormType) => {
    createIncome({
      ...other,
      karboom_id: karboomId,
      started_at: started_at.toISOString().split("T")[0],
      ended_at: ended_at.toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    if (createdIncome) onClose();
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
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="mb-4 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
            <div className="mb-4 flex w-full items-center gap-2">
              <DocumentText
                className="text-heading"
                size={24}
                variant="Broken"
              />
              <h2 className="text-body text-xl font-bold">افزودن شریک</h2>
            </div>
            <ThirdPartyInsuranceFormComponent
              isOpen={isOpen}
              karboomId={karboomId}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
