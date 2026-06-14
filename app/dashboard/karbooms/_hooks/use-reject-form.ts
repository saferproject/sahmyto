import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import RejectFormSchema from "../_schemas/reject-form-schema";

import { REJECT_FORM_INITIAL } from "../_constants/reject-form-initial";

export default function useRejectForm() {
  return useForm({
    resolver: zodResolver(RejectFormSchema),
    defaultValues: REJECT_FORM_INITIAL,
  });
}
