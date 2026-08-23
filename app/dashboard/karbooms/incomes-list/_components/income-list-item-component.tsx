"use client";

import { Button } from "@mui/material";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PriceWithUnit from "@/app/_components/price-with-unit-component";
import formatDate from "@/app/_utilities/format-dates";

import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import StatusChipComponent from "../../_components/status-chip-component";

import { IncomeListItemProps } from "../_types/income-list-item-props";

import useApproveIncome from "../_hooks/use-approve-income";
import useCanApprove from "../../_hooks/use-can-approve";

import { useIncomeListStore } from "../_providers/income-list-store-provider";

export default function IncomeListItemComponent({
  income,
  index,
  onShowDetails,
  onRejectIncome,
}: IncomeListItemProps) {
  const {
    id,
    unit_price,
    quantity,
    type,
    started_at,
    ended_at,
    status,
    receiver: { full_name: receiverName },
    sender: { full_name: submitterName },
    approvals,
  } = income;

  const setActiveIncome = useIncomeListStore((state) => state.setActiveIncome);

  const canApprove = useCanApprove(approvals, status);

  const { mutate: approveIncome } = useApproveIncome();

  const handleApprove = () => {
    approveIncome(id);
  };

  const handleShowDetails = () => {
    setActiveIncome(income);
    onShowDetails();
  };

  return (
    <AnimatedListItem
      index={index}
      className="border-secondary-lighter w-full rounded-2xl border"
    >
      <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
        <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
        <PriceWithUnit value={unit_price * quantity} className="z-10" />
        <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
          {INCOME_TYPES_FA[type]}
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-4 px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">شروع</p>
          <p className="text-body text-sm font-semibold">
            {formatDate(started_at)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">پایان</p>
          <p className="text-body text-sm font-semibold">
            {formatDate(ended_at)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">ثبت کننده</p>
          <p className="text-body text-sm font-semibold">{submitterName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">دریافت کننده</p>
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
          <StatusChipComponent status={status} />
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
      {canApprove && (
        <div className="flex items-center gap-4 px-4 py-2">
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
    </AnimatedListItem>
  );
}
