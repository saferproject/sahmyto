"use client";

import useZodForm from "@/app/_hooks/use-zod-form";

import LoginFormSchema, { LoginFormType } from "../_schemas/login-schema";

export default function useLoginForm() {
  return useZodForm<LoginFormType>({ schema: LoginFormSchema });
}
