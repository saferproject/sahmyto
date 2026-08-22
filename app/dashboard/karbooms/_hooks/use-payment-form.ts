import useZodForm from "@/app/_hooks/use-zod-form";

import PaymentFormSchema from "../_schemas/payment-form-schema";
import { PAYMENT_FORM_INITIAL } from "../_constants/payment-form-initial";

export default function usePaymentForm() {
  return useZodForm({
    schema: PaymentFormSchema,
    defaultValues: PAYMENT_FORM_INITIAL,
  });
}
