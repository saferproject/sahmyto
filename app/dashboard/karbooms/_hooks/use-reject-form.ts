import useZodForm from "@/app/_hooks/use-zod-form";

import RejectFormSchema from "../_schemas/reject-form-schema";

import { REJECT_FORM_INITIAL } from "../_constants/reject-form-initial";

export default function useRejectForm() {
  return useZodForm({
    schema: RejectFormSchema,
    defaultValues: REJECT_FORM_INITIAL,
  });
}
