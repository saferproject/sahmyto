"use client";

import { Button } from "@mui/material";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import PriceWithUnit from "@/app/_components/price-with-unit-component";
import formatDate from "@/app/_utilities/format-dates";

import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import StatusChipComponent from "../../_components/status-chip-component";

import { IncomeListItemProps } from "../_types/income-list-item-props";

import useApproveIncome from "../_hooks/use-approve-income";

import { useIncomeListStore } from "../_providers/income-list-store-provider";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

export default function IncomeListItemComponent({
  income,
  index,
  onShowDetails,
  onSettle,
  onReject,
}: IncomeListItemProps) {
  const {
    id,
    is_settled,
    unit_price,
    quantity,
    type,
    started_at,
    ended_at,
    status,
    receiver,
    sender: { full_name: submitterName },
  } = income;

  const loggedInUserId = useUserInfoStore((state) => state.id);

  const setActiveIncome = useIncomeListStore((state) => state.setActiveIncome);

  const canApprove = status === "pending" && receiver?.id === loggedInUserId;

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
          <p className="text-body text-sm font-semibold">
            {receiver ? receiver.full_name : "ندارد"}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">وضعیت</p>
          {is_settled ? (
            <StatusChipComponent status={status} />
          ) : (
            <span className="text-yellow-500">تسویه نشده</span>
          )}
        </div>
      </div>
      <div className="flex w-full items-center gap-2 px-4 py-2">
        <Button
          variant="contained"
          size="small"
          onClick={handleShowDetails}
          fullWidth
        >
          نمایش جزئیات
        </Button>
        {!is_settled && (
          <Button
            variant="outlined"
            size="small"
            onClick={() => onSettle(id)}
            fullWidth
          >
            ثبت تسویه
          </Button>
        )}
      </div>
      {canApprove && is_settled && (
        <div className="flex items-center gap-4 px-4 py-2">
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => onReject(id)}
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
