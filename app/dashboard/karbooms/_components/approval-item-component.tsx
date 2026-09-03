"use client";

import Image from "next/image";

import { User } from "iconsax-reactjs";

import { ApprovalItemProps } from "../_types/approval-item-props";

import { ACTIVITY_STATUS_TEXT_COLORS } from "../incomes-list/_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../_constants/activity-status-fa";

export default function ApprovalItemComponent({
  approval: {
    status,
    reject_reason,
    user: { full_name, avatar },
  },
}: ApprovalItemProps) {
  return (
    <li className="border-secondary flex w-full flex-col gap-4 rounded-2xl border border-dashed p-4 text-sm">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="border-primary flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border">
            {avatar ? (
              <Image src={avatar} alt="عکس مالک" width={48} height={48} />
            ) : (
              <User size={32} className="text-secondary" />
            )}
          </div>
          <p className="text-body font-semibold">{full_name}</p>
        </div>
        <p
          className={`rounded-full font-semibold ${ACTIVITY_STATUS_TEXT_COLORS[status]}`}
        >
          {ACTIVITY_STATUS_FA[status]}
        </p>
      </div>
      {status === "rejected" && reject_reason && (
        <p className="text-body bg-secondary-lightest w-full rounded-full p-4">
          <span>علت عدم تایید: </span>
          <span className="font-semibold">{reject_reason}</span>
        </p>
      )}
    </li>
  );
}
