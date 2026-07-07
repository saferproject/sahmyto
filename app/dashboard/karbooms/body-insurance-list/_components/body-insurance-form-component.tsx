import { useWatch } from "react-hook-form";
import useBodyInsuranceForm from "../_hooks/use-body-insurance-form";
import { BodyInsuranceDrawerFormProps } from "../_types/body-insurance-drawer-form-props";
import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";
import { BODY_INSURANCE_FORM_INITIAL } from "../_constants/body-insurance-form-initial";
import DescriptionInput from "@/app/_components/description-input";
import { Button } from "@mui/material";

export default function BodyInsuranceFormComponent({
  onSubmit,
}: BodyInsuranceDrawerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useBodyInsuranceForm();

  const { description } = useWatch({
    control,
  });

  const submit = (data: BodyInsuranceFormType) => {
    onSubmit(data);
    reset(BODY_INSURANCE_FORM_INITIAL);
  };

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <Button type="submit" variant="contained" size="large" fullWidth>
        ثبت بیمه بدنه
      </Button>
    </form>
  );
}
