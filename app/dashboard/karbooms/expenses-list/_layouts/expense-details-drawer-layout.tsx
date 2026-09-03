"use client";

import formatDate from "@/app/_utilities/format-dates";

import { ExpenseDetailsDrawerProps } from "../_types/expense-details-drawer-props";

import { useExpenseListStore } from "../_providers/expense-list-store-provider";

import formatNumber from "@/app/_utilities/format-numbers";

import DetailItemComponent from "@/app/_components/detail-item-component";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../../_constants/activity-status-colors";
import useApproveExpense from "../_hooks/use-approve-expense";
import useCanApprove from "../../_hooks/use-can-approve";
import EntityDetailsDrawerComponent from "../../_components/entity-details-drawer-component";

export default function ExpenseDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
  onRejectExpense,
}: ExpenseDetailsDrawerProps) {
  const {
    id,
    is_settled,
    unit_price,
    wage_cost,
    category,
    type,
    settlement_date,
    date,
    status,
    description,
    payer,
    sender: { full_name: submitterName },
    approvals,
    clearActiveExpense,
  } = useExpenseListStore((state) => state);

  const canApprove = useCanApprove(approvals, status);

  const { mutate: approveExpense } = useApproveExpense();

  const handleApprove = () => {
    approveExpense(id);
  };

  const handleClose = () => {
    clearActiveExpense();
    onClose();
  };

  return (
    <EntityDetailsDrawerComponent
      title="جزئیات هزینه"
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      isSettled={is_settled}
      description={description}
      approvals={approvals}
      approveConfig={{
        canApprove,
        onApprove: handleApprove,
        onReject: () => onRejectExpense(id),
      }}
    >
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        <DetailItemComponent
          label="مبلغ"
          value={formatNumber(unit_price + wage_cost)}
        />
        {type === "repair" && (
          <>
            <DetailItemComponent
              label="قیمت قطعات"
              value={formatNumber(unit_price)}
            />
            <DetailItemComponent label="اجرت" value={formatNumber(wage_cost)} />
          </>
        )}
        <DetailItemComponent label="دسته هزینه" value={category} />
        <DetailItemComponent label="تاریخ" value={formatDate(date)} />
        <DetailItemComponent
          label="تاریخ تسویه"
          value={settlement_date ? formatDate(settlement_date) : "ندارد"}
        />
        <DetailItemComponent
          label="پرداخت کننده"
          value={payer ? payer.full_name : "ندارد"}
        />
        <DetailItemComponent label="ثبت کننده" value={submitterName ?? ""} />
        <DetailItemComponent
          label="وضعیت"
          value={is_settled ? ACTIVITY_STATUS_FA[status] : "تسویه نشده"}
          valueColor={
            is_settled ? ACTIVITY_STATUS_TEXT_COLORS[status] : "text-yellow-500"
          }
        />
      </ul>
    </EntityDetailsDrawerComponent>
  );
}
