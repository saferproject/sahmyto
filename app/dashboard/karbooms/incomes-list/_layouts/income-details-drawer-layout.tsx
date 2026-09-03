"use client";

import { IncomeDetailsDrawerProps } from "../_types/income-details-drawer-props";

import { useIncomeListStore } from "../_providers/income-list-store-provider";
import formatNumber from "@/app/_utilities/format-numbers";
import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import formatDate from "@/app/_utilities/format-dates";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import DetailItemComponent from "@/app/_components/detail-item-component";
import useApproveIncome from "../_hooks/use-approve-income";
import EntityDetailsDrawerComponent from "../../_components/entity-details-drawer-component";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

export default function IncomeDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
  onRejectIncome,
}: IncomeDetailsDrawerProps) {
  const {
    id,
    is_settled,
    unit_price,
    quantity,
    type,
    settlement_date,
    started_at,
    ended_at,
    status,
    description,
    receiver,
    sender: { full_name: submitterName },
    reject_reason,
    clearActiveIncome,
  } = useIncomeListStore((state) => state);

  const loggedInUserId = useUserInfoStore((state) => state.id);

  const canApprove = status === "pending" && receiver?.id === loggedInUserId;

  const { mutate: approveIncome } = useApproveIncome();

  const handleApprove = () => {
    approveIncome(id, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  const handleClose = () => {
    clearActiveIncome();
    onClose();
  };

  return (
    <EntityDetailsDrawerComponent
      title="جزئیات درآمد"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      isSettled={is_settled}
      description={description}
      approveConfig={{
        canApprove,
        onApprove: handleApprove,
        onReject: () => onRejectIncome(id),
        buttonSize: "large",
      }}
    >
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        <DetailItemComponent
          label="مبلغ"
          value={formatNumber(unit_price * quantity)}
        />
        <DetailItemComponent label="نوع کارکرد" value={INCOME_TYPES_FA[type]} />
        <DetailItemComponent
          label="تاریخ / زمان شروع"
          value={formatDate(started_at)}
        />
        <DetailItemComponent
          label="تاریخ / زمان پایان"
          value={formatDate(ended_at)}
        />
        <DetailItemComponent
          label="تاریخ تسویه"
          value={settlement_date ? formatDate(settlement_date) : "ندارد"}
        />
        <DetailItemComponent label="ثبت کننده" value={submitterName} />
        <DetailItemComponent
          label="دریافت کننده"
          value={receiver ? receiver.full_name : "ندارد"}
        />
        <DetailItemComponent
          label="وضعیت"
          value={is_settled ? ACTIVITY_STATUS_FA[status] : "تسویه نشده"}
          valueColor={
            is_settled ? ACTIVITY_STATUS_TEXT_COLORS[status] : "text-yellow-500"
          }
        />
        {status === "rejected" && (
          <DetailItemComponent label="علت رد" value={reject_reason} />
        )}
      </ul>
    </EntityDetailsDrawerComponent>
  );
}
