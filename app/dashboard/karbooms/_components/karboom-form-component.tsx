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
    reset,
    formState: { errors },
  } = useKarboomForm();

  const { description } = useWatch({ control });

  const { setActiveKarboom } = useKarboomsStore((state) => state);

  const { mutate } = useCreateKarboom();

  const submit = (data: KarboomFormType) => {
    mutate(data, {
      onSuccess: (response) => {
        setActiveKarboom(response.data);
        reset();
        onSuccess();
      },
      onError: (error) => {
        Object.entries(error).forEach(([field, errors]) =>
          // @ts-expect-error server returns a field-keyed error map
          setError(field, {
            message: errors[0],
            type: "validate",
          }),
        );
      },
    });
  };

  const handleCancel = () => {
    reset();
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
      />
      <PlateInput<KarboomFormType>
        register={register}
        control={control}
        setFocus={setFocus}
      />
      <TextField
        {...register("smart_number")}
        label="شماره هوشمند"
        error={!!errors.smart_number}
        helperText={errors.smart_number?.message ?? ""}
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
        <Button variant="contained" type="submit" fullWidth>
          ثبت کاربوم
        </Button>
      </div>
    </form>
  );
}
