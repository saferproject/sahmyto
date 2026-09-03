import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { Autocomplete, Button, TextField } from "@mui/material";
import { SettlementDrawerProps } from "../_types/settlement-drawer-props";
import { SettlementFormType } from "../_schemas/settlement-form-schema";
import useSettlementForm from "../_hooks/use-settlement-form";
import { Controller, useWatch } from "react-hook-form";
import { Member } from "../_types/member";
import DatePickerComponent from "@/app/_components/date-picker-impl-component";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { useEffect } from "react";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import DescriptionInput from "@/app/_components/description-input";

export default function SettlementDrawerComponent({
  isOpen,
  isLoading,
  title,
  memberTitle,
  onOpen,
  onClose,
  onSubmit,
}: SettlementDrawerProps) {
  const userId = useUserInfoStore((state) => state.id);
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useSettlementForm();

  const { description, member } = useWatch({
    control,
  });

  const {
    data: members,
    isLoading: gettingMembers,
    isSuccess: gotMembers,
  } = useGetMembersEndpoint(karboomId, isOpen);

  const submit = (data: SettlementFormType) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (gotMembers && !member?.member?.id) {
      const currentMember = members.data.find(
        (member) => member.user.id === userId,
      );

      if (currentMember) setValue("member", currentMember);
    }
  }, [gotMembers, member, members, setValue, userId]);

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body mb-4 text-center text-lg font-bold">{title}</h2>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <Controller
          control={control}
          name="member"
          render={({ field }) => (
            <Autocomplete<Member>
              {...field}
              loading={gettingMembers}
              options={members?.data ?? []}
              onChange={(_event, value) => field.onChange(value)}
              filterOptions={(option, { inputValue }) =>
                option.filter(({ user: { full_name } }) =>
                  full_name?.includes(inputValue),
                )
              }
              getOptionLabel={(option) => option.user.full_name ?? ""}
              getOptionKey={(option) => option.member.id}
              isOptionEqualToValue={(option, value) =>
                option.member.id === value?.member.id
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={memberTitle}
                  error={!!errors.member}
                  helperText={errors.member?.message ?? ""}
                  fullWidth
                  required
                />
              )}
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name="settlement_date"
          render={({ field }) => (
            <DatePickerComponent
              {...field}
              onChange={(value) => field.onChange(value)}
              label="تاریخ تسویه"
              error={!!errors.settlement_date}
              helperText={errors.settlement_date?.message ?? ""}
              disableFuture
            />
          )}
        />
        <DescriptionInput
          register={register("description")}
          currentlength={description?.length ?? 0}
          error={!!errors.description}
          helperText={errors.description?.message ?? ""}
        />
        <div className="mt-4 flex w-full items-center gap-2">
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onClose}
            disabled={isLoading}
            fullWidth
          >
            انصراف
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isLoading}
            fullWidth
          >
            ثبت تسویه
          </Button>
        </div>
      </form>
    </FormDrawerComponent>
  );
}
