import { Button } from "@mui/material";
import { useWatch } from "react-hook-form";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { RejectDrawerProps } from "../_types/reject-drawer-props";

import DescriptionInput from "@/app/_components/description-input";

import useRejectForm from "../_hooks/use-reject-form";

import { RejectFormType } from "../_schemas/reject-form-schema";

export default function RejectDrawerComponent({
  isOpen,
  title,
  onOpen,
  onClose,
  onSubmit,
}: RejectDrawerProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useRejectForm();

  const { reject_reason } = useWatch({ control });

  const submit = (data: RejectFormType) => {
    onSubmit(data);
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h2 className="text-body text-center text-lg font-bold">رد {title}</h2>
      <form className="w-full" onSubmit={handleSubmit(submit)}>
        <DescriptionInput
          label={"علت رد " + title}
          register={register("reject_reason")}
          currentlength={reject_reason?.length ?? 0}
          error={!!errors.reject_reason}
          helperText={errors.reject_reason?.message ?? ""}
        />
        <div className="mt-4 flex w-full items-center gap-2">
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onClose}
            fullWidth
          >
            انصراف
          </Button>
          <Button type="submit" variant="contained" color="error" fullWidth>
            رد {title}
          </Button>
        </div>
      </form>
    </FormDrawerComponent>
  );
}
