import { Button, SwipeableDrawer } from "@mui/material";
import { MoneyForbidden } from "iconsax-reactjs";
import { useSnackbar } from "notistack";
import { useWatch } from "react-hook-form";

import { RejectDrawerProps } from "../_types/reject-drawer-props";

import DescriptionInput from "@/app/_components/description-input";

import useRejectForm from "../_hooks/use-reject-form";

import { RejectFormType } from "../_schemas/reject-form-schema";

export default function RejectDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSubmit,
}: RejectDrawerProps) {
  const { enqueueSnackbar } = useSnackbar();

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
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative h-86 w-full px-8 pt-12 pb-8">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex w-full flex-col overflow-y-auto">
            <div className="mb-4 flex w-full items-center gap-2">
              <MoneyForbidden className="text-primary" size={32} />
              <h2 className="text-body text-xl font-bold">رد درآمد</h2>
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <DescriptionInput
                label="علت رد درآمد"
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
                  رد درآمد
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
