import Image from "next/image";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import formatNumber from "@/app/_utilities/format-numbers";
import { useSettlementStore } from "../_providers/settlement-store-provider";
import { SettlementDetailsDrawerProps } from "../_types/settlement-details-drawer-props";
import { useShallow } from "zustand/react/shallow";
import { Add, ArrowDown2, Minus } from "iconsax-reactjs";
import dayjs from "dayjs";
import { INCOME_TYPES_FA } from "../../_constants/income-types-fa";

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
    incomes_received,
    expenses_paid,
    payments_received,
    payments_made,
    salaries,
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
        breakdown: {
          incomes_received,
          expenses_paid,
          payments_received,
          payments_made,
          salary: salaries,
        },
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
        incomes_received,
        expenses_paid,
        payments_received,
        payments_made,
        salaries,
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
        <li className="relative w-full">
          <div className="border-secondary-lightest flex w-full items-center justify-between rounded-2xl border p-4">
            <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <ArrowDown2 size="16" />
              <p className="text-body">کل درآمد</p>
            </div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <p className="text-body">{formatNumber(income_held)}</p>
              <Add size="16" className="text-green-500" />
              <Image
                src="/images/toman-secondary.webp"
                alt="Toman"
                width={16}
                height={16}
              />
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {incomes_received.items.map(
              ({ id, total_price, started_at, type }) => (
                <li key={id} className="relative w-full">
                  <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
                    <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="z-10 flex items-center gap-2">
                        <p className="text-body text-lg font-semibold">
                          {formatNumber(total_price)}
                        </p>
                        <Image
                          src="/images/toman-primary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="text-body z-10 text-xs">
                        {dayjs(started_at).format("YYYY/MM/DD")}
                      </p>
                    </div>
                    <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
                      {INCOME_TYPES_FA[type]}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </li>
        {/* NOTE Expenses */}
        <li className="relative w-full">
          <div className="border-secondary-lightest flex items-center justify-between rounded-2xl border p-4">
            <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <ArrowDown2 size="16" />
              <p className="text-body">کل هزینه</p>
            </div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <p className="text-body">{formatNumber(expense_credit)}</p>
              <Minus size="16" className="text-red-500" />
              <Image
                src="/images/toman-secondary.webp"
                alt="Toman"
                width={16}
                height={16}
              />
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {expenses_paid.items
              .flatMap(({ expenses }) => expenses)
              .map(({ id, total_price, date, category_name }) => (
                <li key={id} className="relative w-full">
                  <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
                    <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="z-10 flex items-center gap-2">
                        <p className="text-body text-lg font-semibold">
                          {formatNumber(total_price)}
                        </p>
                        <Image
                          src="/images/toman-primary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="text-body z-10 text-xs">
                        {dayjs(date).format("YYYY/MM/DD")}
                      </p>
                    </div>
                    <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
                      {category_name}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </li>
        {/* NOTE Received */}
        <li className="relative w-full">
          <div className="border-secondary-lightest flex items-center justify-between rounded-2xl border p-4">
            <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <ArrowDown2 size="16" />
              <p className="text-body">کل دریافتی</p>
            </div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <p className="text-body">{formatNumber(payments_in)}</p>
              <Add size="16" className="text-green-500" />
              <Image
                src="/images/toman-secondary.webp"
                alt="Toman"
                width={16}
                height={16}
              />
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {payments_received.items.map(
              ({ id, total_price, created_at, payer: { name: payerName } }) => (
                <li key={id} className="relative w-full">
                  <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
                    <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="z-10 flex items-center gap-2">
                        <p className="text-body text-lg font-semibold">
                          {formatNumber(total_price)}
                        </p>
                        <Image
                          src="/images/toman-primary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="text-body z-10 text-xs">{payerName}</p>
                    </div>
                    <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
                      {dayjs(created_at).format("YYYY/MM/DD")}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </li>
        {/* NOTE Paid */}
        <li className="relative w-full">
          <div className="border-secondary-lightest flex items-center justify-between rounded-2xl border p-4">
            <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <ArrowDown2 size="16" />
              <p className="text-body">کل پرداختی</p>
            </div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <p className="text-body">{formatNumber(payments_out)}</p>
              <Minus size="16" className="text-red-500" />
              <Image
                src="/images/toman-secondary.webp"
                alt="Toman"
                width={16}
                height={16}
              />
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {payments_made.items.map(
              ({ id, total_price, created_at, payer: { name: payerName } }) => (
                <li key={id} className="relative w-full">
                  <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
                    <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
                    <div className="flex flex-col">
                      <div className="z-10 flex items-center gap-2">
                        <p className="text-body text-lg font-semibold">
                          {formatNumber(total_price)}
                        </p>
                        <Image
                          src="/images/toman-primary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                      </div>
                      <p className="text-body z-10 text-xs">{payerName}</p>
                    </div>
                    <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
                      {dayjs(created_at).format("YYYY/MM/DD")}
                    </p>
                  </div>
                </li>
              ),
            )}
          </ul>
        </li>
        {/* NOTE Salary */}
        <li className="relative w-full">
          <div className="border-secondary-lightest flex items-center justify-between rounded-2xl border p-4">
            <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <ArrowDown2 size="16" />
              <p className="text-body">کل حقوق</p>
            </div>
            <div className="z-10 flex items-center gap-1 bg-white px-1">
              <p className="text-body">
                {formatNumber(Math.abs(salary + service_fee))}
              </p>
              <Add size="16" className="text-green-500" />
              <Image
                src="/images/toman-secondary.webp"
                alt="Toman"
                width={16}
                height={16}
              />
            </div>
          </div>
          <ul className="mt-2 flex flex-col gap-2">
            {salaries.items.map(({ id, amount, effect_amount, type }) => (
              <li key={id} className="relative w-full">
                <div className="bg-secondary-lightest border-secondary-lighter relative flex w-full items-center justify-between overflow-hidden rounded-2xl border p-4">
                  <div className="bg-secondary-lighter absolute -top-16 -right-24 h-96 w-96 rounded-full"></div>
                  <div className="flex flex-col">
                    <div className="z-10 flex items-center gap-2">
                      <p dir="ltr" className="text-body text-lg font-semibold">
                        {formatNumber(effect_amount)}
                      </p>
                      <Image
                        src="/images/toman-primary.webp"
                        alt="تومان"
                        width={24}
                        height={24}
                      />
                    </div>
                    <p className="text-body z-10 text-xs">{formatNumber(amount)}</p>
                  </div>
                  <p className="bg-primary z-10 flex overflow-hidden rounded-2xl px-4 py-2 text-white">
                    {type === "salary" ? "حقوق" : type === 'bonus' ? "پاداش" : "جریمه"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </li>
        {/* NOTE Profit or Loss */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border p-4">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <div className="size-4"></div>
            <p className="text-body">سهم از سود/زیان</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p className="text-body">{formatNumber(Math.abs(share))}</p>
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
        {/* NOTE Total */}
        <li className="border-secondary-lightest relative flex w-full items-center justify-between rounded-2xl border p-4 text-lg font-bold">
          <div className="border-secondary absolute w-8/10 border-b border-dashed"></div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <div className="size-4"></div>
            <p className="text-body">مجموع</p>
          </div>
          <div className="z-10 flex items-center gap-1 bg-white px-1">
            <p className="text-body">{formatNumber(Math.abs(total))}</p>
            {status === "creditor" ? (
              <Add size="20" className="text-green-500" />
            ) : (
              <Minus size="20" className="text-red-500" />
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
