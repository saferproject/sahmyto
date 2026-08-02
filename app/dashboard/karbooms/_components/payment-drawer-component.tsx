import FormDrawerComponent from "@/app/_components/form-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { KarboomPaymentDrawerProps } from "../_types/karboom-payment-drawer-props";
import PaymentFormComponent from "./payment-form-component";

export default function PaymentDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomPaymentDrawerProps) {
  const handleSuccess = () => {
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body text-center text-lg font-bold mb-4">
        ثبت دریافتی یا پرداختی
      </h4>
      <PaymentFormComponent
        isOpen={isOpen}
        onSuccess={handleSuccess}
      />
    </FormDrawerComponent>
  );
}
