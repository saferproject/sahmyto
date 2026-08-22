import dayjs from "dayjs";

import AnimatedListItem from "@/app/_components/animated-list-item-component";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";

interface InsuranceListItemProps {
  insurance: {
    insurance_code: string;
    insurance_number: string;
    company: { name: string };
    started_at: string;
    ended_at: string;
    description?: string | null;
    status: string;
  };
  index: number;
  className?: string;
}

export default function InsuranceListItemComponent({
  insurance: {
    insurance_code,
    insurance_number,
    company: { name: insuranceCompany },
    started_at,
    ended_at,
    description,
    status,
  },
  index,
  className = "border-secondary-lighter w-full rounded-2xl border p-4",
}: InsuranceListItemProps) {
  const startedAt = dayjs(started_at);
  const endedAt = dayjs(ended_at);

  return (
    <AnimatedListItem index={index} className={className}>
      <ul className="flex w-full flex-col gap-3">
        <DetailItemComponent label="شماره بیمه نامه" value={insurance_number} />
        <DetailItemComponent label="کد یکتای بیمه" value={insurance_code} />
        <DetailItemComponent label="شرکت بیمه گر" value={insuranceCompany} />
        <DetailItemComponent
          label="مدت باقی مانده"
          value={
            status === "active" ? (
              startedAt.diff() > 0 ? (
                `${Math.max(0, endedAt.diff(startedAt, "days") - 1).toString()} روز`
              ) : (
                `${Math.max(0, endedAt.diff(dayjs(), "days") - 1).toString()} روز`
              )
            ) : (
              <span className="font-semibold text-red-500">پایان یافته</span>
            )
          }
        />
        <DetailItemComponent
          label="تاریخ شروع"
          value={startedAt.format("YYYY/MM/DD")}
        />
        <DetailItemComponent
          label="تاریخ پایان"
          value={endedAt.format("YYYY/MM/DD")}
        />
        {description && (
          <p className="bg-secondary-lightest text-body mt-2 rounded-2xl p-4 text-sm">
            <span className="font-semibold">توضیحات : </span>
            {description}
          </p>
        )}
      </ul>
    </AnimatedListItem>
  );
}
