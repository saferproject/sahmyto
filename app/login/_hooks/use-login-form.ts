"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoginFormSchema, { LoginFormType } from "../_schemas/login-schema";

export default function useLoginForm() {
  return useForm<LoginFormType>({ resolver: zodResolver(LoginFormSchema) });
}
