"use client";

import Image from "next/image";

import { User } from "iconsax-reactjs";

import { ApprovalItemProps } from "../_types/approval-item-props";

import { ACTIVITY_STATUS_BG_COLORS } from "../incomes-list/_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../_constants/activity-status-fa";

export default function ApprovalItemComponent({
  approval: {
    status,
    reject_reason,
    user: { full_name, avatar },
  },
}: ApprovalItemProps) {
  return (
    <li className="border-secondary flex w-full flex-col gap-8 rounded-2xl border border-dashed p-4 text-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="border-primary flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border">
            {avatar ? (
              <Image src={avatar} alt="عکس شریک" width={48} height={48} />
            ) : (
              <User size={32} className="text-secondary" />
            )}
          </div>
          <p>{full_name}</p>
        </div>
        <p
          className={`rounded-full px-4 py-2 font-semibold text-white ${ACTIVITY_STATUS_BG_COLORS[status]}`}
        >
          {ACTIVITY_STATUS_FA[status]}
        </p>
      </div>
      {status === "rejected" && reject_reason && (
        <p className="text-body bg-secondary-lightest w-full rounded-2xl p-2">
          <span>علت عدم تایید: </span>
          {reject_reason}
        </p>
      )}
    </li>
  );
}
