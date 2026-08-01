import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PaymentFormSchema from "../_schemas/payment-form-schema";
import { PAYMENT_FORM_INITIAL } from "../_constants/payment-form-initial";

export default function usePaymentForm() {
  return useForm({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: PAYMENT_FORM_INITIAL,
  });
}