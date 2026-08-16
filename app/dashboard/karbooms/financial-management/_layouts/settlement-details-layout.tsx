import Image from "next/image";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import formatNumber from "@/app/_utilities/format-numbers";
import { useSettlementStore } from "../_providers/settlement-store-provider";
import { SettlementDetailsDrawerProps } from "../_types/settlement-details-drawer-props";
import { useShallow } from "zustand/react/shallow";
import { Add, ArrowDown2, Minus } from "iconsax-reactjs";

export default function SettlementDetailsDrawerLayout({
  isOpen,
  onOpen,
  onClose,
}: SettlementDetailsDrawerProps) {
  const {
    clearSettlement,
    name,
    income_held,
    expense_credit,
    payments_in,
    payments_out,
    share,
    salary,
    service_fee,
    total,
    status,
  } = useSettlementStore(
    useShallow(
      ({
        clearSettlement,
        name,
        income_held,
        expense_credit,
        payments_in,
        payments_out,
        share,
        salary,
        service_fee,
        total,
        status,
      }) => ({
        clearSettlement,
        name,
        income_held,
        expense_credit,
        payments_in,
        payments_out,
        share,
        salary,
        service_fee,
        total,
        status,
      }),
    ),
  );

  const handleClose = () => {
    clearSettlement();
    onClose();
  };

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
      <h4 className="text-body mt-4 font-semibold">ریز حساب {name}</h4>
      <ul className="mt-4 flex w-full flex-col gap-4 text-sm">
        {/* NOTE Incomes */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل درآمد</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(income_held)}</p>
            <Add size="16" className="text-green-500" />
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Expenses */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل هزینه</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(expense_credit)}</p>
            <Minus size="16" className="text-red-500" />
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Received */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل دریافتی</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(payments_in)}</p>
            <Add size="16" className="text-green-500" />
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Paid */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل پرداختی</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(payments_out)}</p>
            <Minus size="16" className="text-red-500" />
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Profit or Loss */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل سود یا زیان</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(Math.abs(share))}</p>
            {share >= 0 ? (
              <Add size="16" className="text-green-500" />
            ) : (
              <Minus size="16" className="text-red-500" />
            )}
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Salary */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>کل حقوق</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(Math.abs(salary + service_fee))}</p>
            <Add size="16" className="text-green-500" />
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
        {/* NOTE Total */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border px-4 py-2">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <ArrowDown2 size="16" />
            <p>مجموع</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p>{formatNumber(Math.abs(total))}</p>
            {status === "creditor" ? (
              <Add size="16" className="text-green-500" />
            ) : (
              <Minus size="16" className="text-red-500" />
            )}
            <Image
              src="/images/toman-secondary.webp"
              alt="Toman"
              width={16}
              height={16}
            />
          </div>
        </li>
      </ul>
    </FormDrawerComponent>
  );
}
