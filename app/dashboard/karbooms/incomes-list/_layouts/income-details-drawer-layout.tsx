"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

import { IncomeDetailsDrawerProps } from "../_types/income-details-drawer-props";

import { useIncomeListStore } from "../_providers/income-list-store-provider";
import formatNumber from "@/app/_utilities/format-numbers";
import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import dayjs from "dayjs";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import DetailItemComponent from "../_components/income-detail-item-component";
import ApprovalItemComponent from "../../_components/approval-item-component";
import { Button } from "@mui/material";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import useApproveIncome from "../_hooks/use-approve-income";

export default function IncomeDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
  onRejectIncome,
}: IncomeDetailsDrawerProps) {
  const {
    id,
    unit_price,
    quantity,
    type,
    started_at,
    ended_at,
    status,
    description,
    receiver: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
    clearActiveIncome,
  } = useIncomeListStore((state) => state);

  const loggedInUserId = useUserInfoStore((state) => state.id);
  const userKarboomRoles = useKarboomsStore((state) => state.roles);

  const { mutate: approveIncome } = useApproveIncome();

  const handleApprove = () => {
    approveIncome(id);
  };

  const handleClose = () => {
    clearActiveIncome();
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
      <h4 className="text-body mt-4 font-semibold">جزئیات درآمد</h4>
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        <DetailItemComponent
          label="مبلغ"
          value={formatNumber(unit_price * quantity)}
        />
        <DetailItemComponent label="نوع کارکرد" value={INCOME_TYPES_FA[type]} />
        <DetailItemComponent
          label="تاریخ / زمان شروع"
          value={dayjs(started_at).format("YYYY/MM/DD")}
        />
        <DetailItemComponent
          label="تاریخ / زمان پایان"
          value={dayjs(ended_at).format("YYYY/MM/DD")}
        />
        <DetailItemComponent label="دریافت کننده" value={receiverName} />
        <DetailItemComponent label="ثبت کننده" value={submitterName} />
        <DetailItemComponent
          label="وضعیت"
          value={ACTIVITY_STATUS_FA[status]}
          valueColor={ACTIVITY_STATUS_TEXT_COLORS[status]}
        />
      </ul>
      {description && (
        <div className="border-secondary mt-4 flex w-full flex-col gap-2 rounded-2xl border border-dashed p-2">
          <p className="text-body-light text-sm">توضیحات ثبت کننده</p>
          <p className="text-body text-sm">{description}</p>
        </div>
      )}
      <div className="mt-4 w-full">
        <h5 className="text-body">وضعیت تاییدیه مالکین</h5>
        <ul className="mt-4 flex w-full flex-col gap-4">
          {approvals.map((approval) => (
            <ApprovalItemComponent key={approval.id} approval={approval} />
          ))}
        </ul>
      </div>
      {status === "pending" &&
        userKarboomRoles.includes("partner") &&
        !approvals.find(
          (approval) =>
            approval.user.id == loggedInUserId && approval.status !== "pending",
        ) && (
          <div className="flex w-full items-center gap-4 py-2">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onRejectIncome(id)}
              fullWidth
            >
              رد
            </Button>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={handleApprove}
              fullWidth
            >
              تایید
            </Button>
          </div>
        )}
    </FormDrawerComponent>
  );
}
