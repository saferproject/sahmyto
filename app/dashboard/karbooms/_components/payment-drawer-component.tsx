import FormDrawerWithTitleComponent from "@/app/_components/form-drawer-with-title-component";

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
    <FormDrawerWithTitleComponent
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      title="ثبت دریافتی یا پرداختی"
      titleClassName="text-body mb-4 text-center text-lg font-bold"
    >
      <PaymentFormComponent isOpen={isOpen} onSuccess={handleSuccess} />
    </FormDrawerWithTitleComponent>
  );
}
