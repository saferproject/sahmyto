"use client";

import { Button, TextField } from "@mui/material";
import { useWatch } from "react-hook-form";

import DescriptionInput from "@/app/_components/description-input";
import PlateInput from "@/app/_components/plate-input";

import useKarboomForm from "../_hooks/use-karboom-form";
import useCreateKarboom from "../_hooks/create-karboom-endpoint";

import { KarboomFormType } from "../_schemas/karboom-form-schema";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import { KarboomFormProps } from "../_types/karboom-form-props";
import { KARBOOM_FORM_INITIAL } from "../_constants/karboom-form-initial";
import BaseResponse from "@/app/_interfaces/base-response";

export default function KarboomFormComponent({
  onCancel,
  onSuccess,
}: KarboomFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setFocus,
    setError,
    setValues,
    formState: { errors },
  } = useKarboomForm();

  const { description } = useWatch({ control });

  const { setActiveKarboom } = useKarboomsStore((state) => state);

  const { mutate: createKarboom, isPending: creatingKarboom } = useCreateKarboom();

  const submit = (data: KarboomFormType) => {
    createKarboom(data, {
      onSuccess: (response) => {
        setActiveKarboom(response.data);
        setValues(KARBOOM_FORM_INITIAL);
        onSuccess();
      },
      onError: (error) => {
        const err = error as unknown as BaseResponse;

        if (err.errors)
          Object.entries(err.errors).forEach(([field, errors]) =>
            setError(field as keyof KarboomFormType, {
              message: errors[0],
              type: "validate",
            }),
          );
      },
    });
  };

  const handleCancel = () => {
    setValues(KARBOOM_FORM_INITIAL);
    onCancel();
  };

  return (
    <form
      className="flex w-full flex-col gap-4 overflow-auto py-2"
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        {...register("name")}
        label="نام کاربوم"
        error={!!errors.name}
        helperText={errors.name?.message ?? ""}
        fullWidth
        required
      />
      <PlateInput<KarboomFormType>
        register={register}
        control={control}
        setFocus={setFocus}
      />
      <TextField
        {...register("smart_number")}
        type="tel"
        label="شماره هوشمند"
        error={!!errors.smart_number}
        helperText={errors.smart_number?.message ?? ""}
        inputMode="numeric"
        slotProps={{
          htmlInput: {
            maxLength: 7,
          },
        }}
        fullWidth
      />
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <div className="flex items-center gap-4">
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleCancel}
          fullWidth
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          type="submit"
          loading={creatingKarboom}
          fullWidth
        >
          ثبت کاربوم
        </Button>
      </div>
    </form>
  );
}
