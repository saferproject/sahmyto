"use client";

import { Button } from "@mui/material";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PriceWithUnit from "@/app/_components/price-with-unit-component";
import formatDate from "@/app/_utilities/format-dates";

import { ExpenseListItemProps } from "../_types/expense-list-item-props";

import { useExpenseListStore } from "../_providers/expense-list-store-provider";

import useApproveExpense from "../_hooks/use-approve-expense";

import { ACTIVITY_STATUS_TEXT_COLORS } from "../../incomes-list/_constants/income-status-colors";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

export default function ExpenseListItemComponent({
  expense,
  index,
  onShowDetails,
  onRejectExpense,
}: ExpenseListItemProps) {
  const {
    id,
    unit_price,
    wage_cost,
    date,
    status,
    category,
    payer: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
  } = expense;

  const loggedInUserId = useUserInfoStore((state) => state.id);
  const activeKarboomRoles = useKarboomsStore((state) => state.roles);
  const setActiveExpense = useExpenseListStore(
    (state) => state.setActiveExpense,
  );

  const { mutate: approveExpense } = useApproveExpense();

  const handleApprove = () => {
    approveExpense(id);
  };

  const handleShowDetails = () => {
    setActiveExpense(expense);
    onShowDetails();
  };

  return (
    <AnimatedListItem
      index={index}
      className="border-secondary-lighter w-full rounded-2xl border"
    >
      <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
        <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
        <PriceWithUnit value={unit_price + wage_cost} className="z-10" />
        <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
          {category}
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-4 px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">تاریخ هزینه</p>
          <p className="text-body text-sm font-semibold">
            {formatDate(date)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">تاریخ تسویه</p>
          <p className="text-body text-sm font-semibold">
            {formatDate(date)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">ثبت کننده</p>
          <p className="text-body text-sm font-semibold">{submitterName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">پرداخت کننده</p>
          <p className="text-body text-sm font-semibold">{receiverName}</p>
        </div>
        <div className="flex basis-1/2 flex-col gap-1">
          <p className="text-body-light text-xs">تایید مالکین</p>
          <p className="text-body flex items-center gap-1 text-sm">
            <span className="font-bold underline">
              {
                approvals.filter((approval) => approval.status === "approved")
                  .length
              }
            </span>
            تاییدیه از
            <span className="font-bold underline">{approvals.length}</span>
            مالک
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">وضعیت</p>
          <p
            className={`text-sm font-semibold ${ACTIVITY_STATUS_TEXT_COLORS[status]}`}
          >
            {ACTIVITY_STATUS_FA[status]}
          </p>
        </div>
      </div>
      <div className="w-full px-4 py-2">
        <Button
          variant="contained"
          size="small"
          onClick={handleShowDetails}
          fullWidth
        >
          نمایش جزئیات
        </Button>
      </div>
      {status === "pending" &&
        activeKarboomRoles.includes("partner") &&
        !approvals.find(
          (approval) =>
            approval.user.id == loggedInUserId && approval.status !== "pending",
        ) && (
          <div className="flex items-center gap-4 px-4 py-2">
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
    </AnimatedListItem>
  );
}
