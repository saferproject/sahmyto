"use client";

import { Controller, useWatch } from "react-hook-form";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import DatePickerComponent from "@/app/_components/date-picker-component";
import PriceInputComponent from "@/app/_components/price-input-component";
import DescriptionInput from "@/app/_components/description-input";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ActivityFormProps } from "../_types/activity-form-props";
import useActivityForm from "../_hooks/use-activity-form";
import { getActivityFormInitial } from "../_constants/activity-form-initial";
import ApiError from "@/app/_errors/api-error";
import { ActivityFormType } from "../_schemas/activity-form-schema";
import useAddActivityEndpoint from "../_hooks/use-add-activity-endpoint";
import useEditActivityEndpoint from "../_hooks/use-edit-activity-endpoint";
import { formatGregorianDate } from "@/app/_utilities/format-dates";

export default function ActivityFormComponent({
  formState,
  activity,
  onCancel,
  onSuccess,
}: ActivityFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValues,
    setError,
    formState: { errors },
  } = useActivityForm();

  const { description } = useWatch({ control });

  const karboomId = useKarboomsStore((state) => state.id);

  const { mutate: addActivity, isPending: addingActivity } =
    useAddActivityEndpoint();
  const { mutate: editActivity, isPending: editingActivity } =
    useEditActivityEndpoint();

  useEffect(() => {
    const initialValues = getActivityFormInitial();

    if (formState === "EDIT" && activity) {
      setValues({
        ...initialValues,
        date: dayjs(activity.date),
        description: activity.description,
      });
    } else setValues(initialValues);
  }, [formState, activity, setValues]);

  const handleCancel = () => {
    setValues(getActivityFormInitial());
    onCancel();
  };

  const handleMutationSuccess = () => {
    setValues(getActivityFormInitial());
    onSuccess();
  };

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof ActivityFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = ({ date, ...other }: ActivityFormType) => {
    const payload = {
      ...other,
      date: formatGregorianDate(date),
    };

    if (formState === "EDIT" && activity) {
      editActivity(
        { ...payload, activityId: activity.id },
        {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        },
      );
      return;
    }

    addActivity(
      { ...payload, karboomId: karboomId },
      {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      },
    );
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePickerComponent
            {...field}
            onChange={(value) => field.onChange(value)}
            label="تاریخ"
            error={!!errors.date}
            helperText={errors.date?.message ?? ""}
            required
            disableFuture
          />
        )}
      />
      {/* <PriceInputComponent
        register={register("fixed_amount")}
        value={fixed_amount}
        label="دستمزد ثابت"
        error={!!errors.fixed_amount}
        helperText={errors.fixed_amount?.message ?? ""}
      /> */}
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
          loading={addingActivity || editingActivity}
          fullWidth
        >
          ثبت
        </Button>
      </div>
    </form>
  );
}
