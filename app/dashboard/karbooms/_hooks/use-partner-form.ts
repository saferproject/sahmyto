import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import PartnerFormSchema, {
  type PartnerFormType,
} from "../_schemas/partner-form-schema";
import dayjs from "dayjs";

export default function usePartnerForm() {
  return useForm<PartnerFormType>({
    resolver: zodResolver(PartnerFormSchema),
    defaultValues: {
      phone: "",
      first_name: "",
      last_name: "",
      share_capital: 1,
      share_decimal: 0,
      started_at: dayjs(),
      ended_at: null,
      description: "",
    },
  });
}
