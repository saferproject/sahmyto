import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BODY_INSURANCE_FORM_INITIAL } from "../_constants/body-insurance-form-initial";
import BodyInsuranceFormSchema from "../_schemas/body-insurance-form-schema";

export default function useBodyInsuranceForm() {
  return useForm({
    resolver: zodResolver(BodyInsuranceFormSchema),
    defaultValues: BODY_INSURANCE_FORM_INITIAL,
  });
}