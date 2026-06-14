import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import KarboomFormSchema, {
  KarboomFormType,
} from "../_schemas/karboom-form-schema";

import { KARBOOM_FORM_INITIAL } from "../_constants/karboom-form-initial";

export default function useKarboomForm() {
  return useForm<KarboomFormType>({
    resolver: zodResolver(KarboomFormSchema),
    defaultValues: KARBOOM_FORM_INITIAL,
    reValidateMode: "onSubmit",
  });
}
