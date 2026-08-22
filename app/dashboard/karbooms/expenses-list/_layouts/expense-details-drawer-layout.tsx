import formatDate from "@/app/_utilities/format-dates";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { ExpenseDetailsDrawerProps } from "../_types/expense-details-drawer-props";

import { useExpenseListStore } from "../_providers/expense-list-store-provider";

import formatNumber from "@/app/_utilities/format-numbers";

import DetailItemComponent from "@/app/_components/detail-item-component";

import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../../incomes-list/_constants/income-status-colors";
import ApprovalItemComponent from "../../_components/approval-item-component";
import DescriptionBlock from "../../_components/description-block-component";
import { Button } from "@mui/material";
import useApproveExpense from "../_hooks/use-approve-expense";
import useCanApprove from "../../_hooks/use-can-approve";

export default function ExpenseDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
  onRejectExpense,
}: ExpenseDetailsDrawerProps) {
  const {
    id,
    unit_price,
    wage_cost,
    category,
    type,
    date,
    status,
    description,
    payer: { full_name: receiverName },
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
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
      <h4 className="text-body mt-4 font-semibold">جزئیات هزینه</h4>
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
        <DetailItemComponent
          label="تاریخ"
          value={formatDate(date)}
        />
        <DetailItemComponent label="پرداخت کننده" value={receiverName ?? ""} />
        <DetailItemComponent label="ثبت کننده" value={submitterName ?? ""} />
        <DetailItemComponent
          label="وضعیت"
          value={ACTIVITY_STATUS_FA[status]}
          valueColor={ACTIVITY_STATUS_TEXT_COLORS[status]}
        />
      </ul>
      {description && <DescriptionBlock description={description} />}
      <div className="mt-4 w-full">
        <h5 className="text-body">وضعیت تاییدیه مالکین</h5>
        <ul className="mt-4 flex w-full flex-col gap-4">
          {approvals.map((approval) => (
            <ApprovalItemComponent key={approval.id} approval={approval} />
          ))}
        </ul>
      </div>
      {canApprove && (
          <div className="flex w-full items-center gap-4 py-2">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => onRejectExpense(id)}
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
