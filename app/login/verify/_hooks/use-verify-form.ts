"use client";

import useZodForm from "@/app/_hooks/use-zod-form";

import VerifyFormSchema, { VerifyFormType } from "../_schemas/verify-schema";

export default function useVerifyForm() {
  return useZodForm<VerifyFormType>({ schema: VerifyFormSchema });
}
