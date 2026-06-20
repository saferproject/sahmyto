"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import { karboomService } from "../_services/karboom-service";

import { useActionDialogStore } from "../../_providers/action-dialog-provider";

import NO_MEMBER_ACTION_DIALOG_PROPS from "../_constants/no-member-action-dialog-props";

/**
 * Income and expense both need a member to pay or receive, so before opening a
 * form drawer we make sure the karboom has at least one member. When it has
 * none we prompt the user to add a partner/driver (routing to the dedicated
 * pages) instead of opening a form they cannot submit.
 *
 * Returns a function that runs `onHasMembers` only when the karboom has at
 * least one member. Membership is fetched fresh (`staleTime: 0`) because adding
 * a partner/driver does not invalidate the members query.
 */
export default function useRequireKarboomMembers() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const { setDialog: setActionDialog, resetDialog: resetActionDialog } =
    useActionDialogStore((state) => state);

  return async (karboomId: number, onHasMembers: () => void) => {
    try {
      const members = await queryClient.fetchQuery({
        queryKey: ["expenses-categories", karboomId],
        queryFn: () => karboomService.getMembers(karboomId),
        staleTime: 0,
      });

      if (members.data.length === 0)
        setActionDialog(
          NO_MEMBER_ACTION_DIALOG_PROPS(
            () => {
              resetActionDialog();
              router.push("/dashboard/karbooms/partners-list");
            },
            () => {
              resetActionDialog();
              router.push("/dashboard/karbooms/drivers-list");
            },
            resetActionDialog,
          ),
        );
      else onHasMembers();
    } catch {
      enqueueSnackbar({
        variant: "error",
        message: "خطا در دریافت اعضای کاربوم",
      });
    }
  };
}
