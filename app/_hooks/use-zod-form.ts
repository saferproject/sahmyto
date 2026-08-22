"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type UseFormProps,
} from "react-hook-form";

interface UseZodFormOptions<TValues extends FieldValues> extends Omit<
  UseFormProps<TValues>,
  "resolver"
> {
  schema: Parameters<typeof zodResolver>[0];
  defaultValues?: DefaultValues<TValues>;
}

export default function useZodForm<TValues extends FieldValues>({
  schema,
  defaultValues,
  ...formOptions
}: UseZodFormOptions<TValues>) {
  return useForm<TValues>({
    ...formOptions,
    resolver: zodResolver(schema) as Resolver<TValues>,
    defaultValues,
  });
}
