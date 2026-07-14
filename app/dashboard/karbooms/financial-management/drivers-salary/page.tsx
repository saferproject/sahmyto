import Image from "next/image";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";
import formatNumber from "@/app/_utilities/format-numbers";

export default function DriversSalaryPage() {
  return (
    <div className="w-full">
      <ul className="mt-8 w-full">
        <li className="border-secondary relative flex w-full flex-col rounded-2xl border p-4 pt-8">
          <div className="border-primary absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border bg-white">
            {/* <Image src={} /> */}
          </div>
          <div className="flex flex-col gap-3">
            <DetailItemComponent label="نام راننده" value="امید یسلیانی" />
            <DetailItemComponent
              label="دستمزد درصدی"
              value={formatNumber(15_000_000)}
            />
            <DetailItemComponent
              label="دستمزد سرویسی"
              value={formatNumber(7_000_000)}
            />
            <DetailItemComponent
              label="دستمزد ثابت"
              value={formatNumber(25_000_000)}
            />
            <DetailItemComponent
              label="دستمزد کل"
              value={formatNumber(47_000_000)}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
