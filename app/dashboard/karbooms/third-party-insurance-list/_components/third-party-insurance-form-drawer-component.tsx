import { SwipeableDrawer } from "@mui/material";
import { Health } from "iconsax-reactjs";
import ThirdPartyInsuranceFormComponent from "./third-party-insurance-form-component";
import { ThirdPartyInsuranceDrawerProps } from "../_types/third-party-insurance-drawer-props";

export default function ThirdPartyInsuranceFormDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: ThirdPartyInsuranceDrawerProps) {
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
        <div className="bg-secondary-light absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="mb-4 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
            <h2 className="text-body text-center font-bold w-full mb-6">
              افزودن بیمه شخص ثالث
            </h2>
            <ThirdPartyInsuranceFormComponent
              isOpen={isOpen}
              onSuccess={onClose}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
