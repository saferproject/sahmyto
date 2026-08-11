import FormDrawerComponent from "@/app/_components/form-drawer-component";

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
      <h4 className="text-body mb-4 text-center text-lg font-bold">
        ثبت دریافتی یا پرداختی
      </h4>
      <PaymentFormComponent isOpen={isOpen} onSuccess={handleSuccess} />
    </FormDrawerComponent>
  );
}
