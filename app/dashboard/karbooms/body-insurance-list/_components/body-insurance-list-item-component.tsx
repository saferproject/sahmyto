import { motion } from "motion/react";
import dayjs from "dayjs";

import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";
import { BodyInsuranceListItemProps } from "../_types/body-insurance-list-item-props";

export default function BodyInsuranceListItemComponent({
  bodyInsurance: {
    insurance_code,
    insurance_number,
    company: { name: insuranceCompany },
    started_at,
    ended_at,
    description,
    status,
  },
  index,
}: BodyInsuranceListItemProps) {
  const startedAt = dayjs(started_at),
    endedAt = dayjs(ended_at);

  return (
    <motion.li
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
      transition={{ delay: index * 0.1, duration: 0.2, ease: "easeIn" }}
      className="border-secondary-lighter rounded-2xl border p-4"
    >
      <ul className="flex w-full flex-col gap-2">
        <DetailItemComponent label="شماره بیمه نامه" value={insurance_number} />
        <DetailItemComponent label="کد یکتای بیمه" value={insurance_code} />
        <DetailItemComponent label="شرکت بیمه گر" value={insuranceCompany} />
        <DetailItemComponent
          label="مدت باقی مانده"
          value={
            status === "active" ? (
              `${endedAt.diff(dayjs(), "days").toString()} روز`
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
          <p className="bg-secondary-lightest text-body rounded-2xl p-4 text-sm">
            <span className="font-semibold">توضیحات : </span>
            {description}
          </p>
        )}
      </ul>
    </motion.li>
  );
}