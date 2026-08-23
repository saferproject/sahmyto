import useZodForm from "@/app/_hooks/use-zod-form";

import KarboomFormSchema, {
  KarboomFormType,
} from "../_schemas/karboom-form-schema";

import { KARBOOM_FORM_INITIAL } from "../_constants/karboom-form-initial";

export default function useKarboomForm() {
  return useZodForm<KarboomFormType>({
    schema: KarboomFormSchema,
    defaultValues: KARBOOM_FORM_INITIAL,
    reValidateMode: "onSubmit",
  });
}
