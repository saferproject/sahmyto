import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import DriverFormSchema, {
  DriverFormType,
} from "../_schemas/driver-form-schema";

import { getDriverFormInitial } from "../_constants/driver-form-initial";

export default function useDriverForm() {
  return useForm<DriverFormType>({
    resolver: zodResolver(DriverFormSchema),
    defaultValues: getDriverFormInitial(),
  });
}
