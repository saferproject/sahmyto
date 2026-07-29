import FormDrawerComponent from "@/app/_components/form-drawer-component";

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
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body text-center text-lg font-bold">
        ثبت دریافتی یا پرداختی
      </h4>
      <PaymentFormComponent
        isOpen={isOpen}
        karboomId={karboomId}
        onSuccess={handleSuccess}
      />
    </FormDrawerComponent>
  );
}
