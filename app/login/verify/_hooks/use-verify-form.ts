"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import VerifyFormSchema, { VerifyFormType } from "../_schemas/verify-schema";

export default function useVerifyForm() {
  return useForm<VerifyFormType>({ resolver: zodResolver(VerifyFormSchema) });
}
