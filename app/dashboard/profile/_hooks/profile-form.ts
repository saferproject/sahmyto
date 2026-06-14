"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProfileFormSchema, { ProfileFormType } from "../_schemas/profile-schema";

import { PROFILE_FORM_DEFAULTS } from "../_constants/profile-form-defaults";

export default function useProfileForm() {
  return useForm<ProfileFormType>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: PROFILE_FORM_DEFAULTS,
  });
}
