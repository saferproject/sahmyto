"use client";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import type { Approval } from "../_types/approval";
import type { ActivityStatus } from "../_types/activity-status";

export default function useCanApprove(
  approvals: Approval[],
  status: ActivityStatus,
) {
  const loggedInUserId = useUserInfoStore((state) => state.id);
  const userKarboomRoles = useKarboomsStore((state) => state.roles);

  return (
    status === "pending" &&
    userKarboomRoles.includes("partner") &&
    !approvals.some(
      (approval) =>
        approval.user.id === loggedInUserId && approval.status !== "pending",
    )
  );
}
