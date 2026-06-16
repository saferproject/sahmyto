import { Button } from "@mui/material";
import Image from "next/image";
import dayjs from "dayjs";

import formatNumber from "@/app/_utilities/format-numbers";

import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";
import { ACTIVITY_STATUS_FA } from "../../_constants/activity-status-fa";
import { ACTIVITY_STATUS_COLORS } from "../_constants/income-status-colors";

import { IncomeListItemProps } from "../_types/income-list-item-props";

import useApproveIncome from "../_hooks/use-approve-income";

import { useIncomeListStore } from "../_providers/income-list-store-provider";

export default function IncomeListItemComponent({
  income,
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

  const { mutate: approveIncome } = useApproveIncome();

  const handleApprove = () => {
    approveIncome(id);
  };

  const handleShowDetails = () => {
    setActiveIncome(income);
    onShowDetails();
  };

  return (
    <li className="border-secondary-lighter w-full rounded-2xl border">
      <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
        <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
        <div className="z-10 flex items-center gap-2">
          <p className="text-body text-lg font-semibold">
            {formatNumber(unit_price * quantity)}
          </p>
          <Image
            src="/images/toman-primary.webp"
            alt="تومان"
            width={24}
            height={24}
          />
        </div>
        <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
          {INCOME_TYPES_FA[type]}
        </p>
      </div>
      <div className="grid w-full grid-cols-2 gap-y-4 px-4 py-2">
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">شروع</p>
          <p className="text-body text-sm font-semibold">
            {dayjs(started_at).format("YYYY/MM/DD")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">پایان</p>
          <p className="text-body text-sm font-semibold">
            {dayjs(ended_at).format("YYYY/MM/DD")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">دریافت کننده</p>
          <p className="text-body text-sm font-semibold">{receiverName}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">ثبت کننده</p>
          <p className="text-body text-sm font-semibold">{submitterName}</p>
        </div>
        <div className="flex basis-1/2 flex-col gap-1">
          <p className="text-body-light text-xs">تایید شرکا</p>
          <p className="text-body flex items-center gap-1 text-sm">
            <span className="font-bold underline">
              {
                approvals.filter((approval) => approval.status === "approved")
                  .length
              }
            </span>
            تاییدیه از
            <span className="font-bold underline">{approvals.length}</span>
            شریک
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-body-light text-xs">وضعیت</p>
          <p
            className={`text-body text-sm font-semibold text-${ACTIVITY_STATUS_COLORS[status]}`}
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
      {status === "pending" && (
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
    </li>
  );
}
