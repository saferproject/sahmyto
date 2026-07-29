import { SwipeableDrawer } from "@mui/material";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { KarboomPaymentDrawerProps } from "../_types/karboom-payment-drawer-props";

export default function PaymentDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomPaymentDrawerProps) {
  const karboomId = useKarboomsStore((state) => state.id);

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
        <div className="bg-secondary-light absolute top-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="mb-4 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
            <h4 className="text-body text-center text-lg font-bold">
              ثبت دریافتی یا پرداختی
            </h4>
            <PaymentFormComponent
              isOpen={isOpen}
              karboomId={karboomId}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
