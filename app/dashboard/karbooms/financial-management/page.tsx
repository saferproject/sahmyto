"use client";

import Image from "next/image";

import { Button } from "@mui/material";
import {
  Money,
  ArrowCircleUp2,
  ArrowDown2,
  Minus,
  Add,
  ArrowCircleDown2,
  Lock1,
  Calendar,
} from "iconsax-reactjs";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

import formatNumber from "@/app/_utilities/format-numbers";

import MonthListLayout from "./_layouts/months-list-layout";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";

import useValidateClosingFinancialMonthEndpoint from "./_hooks/use-validate-closing-financial-month-endpoint";

import { useConfirmationDialogStore } from "../../_providers/confirmation-dialog-provider";

import { FinancialMonth } from "./_types/financial-month";
import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";
import useGetFinancialMonthDataEndpoint from "./_hooks/use-get-financial-month-data-endpoint";
import MonthBalanceComponent from "./_components/month-balance-component";

export default function FinancialManagementPage() {
  const router = useRouter();

  const [selectedMonth, setSelectedMonth] = useState<null | FinancialMonth>(
    null,
  );
  const [isIncomeDetailsOpen, setIncomeDetailsOpen] = useState(false);
  const [isIncomeMonthlyOpen, setIncomeMonthlyOpen] = useState(false);
  const [isIncomeDailyOpen, setIncomeDailyOpen] = useState(false);
  const [isIncomeHourlyOpen, setIncomeHourlyOpen] = useState(false);
  const [isIncomeServiceOpen, setIncomeServiceOpen] = useState(false);

  const {
    mutate: validateMonth,
    isPending: validatingMonth,
    isSuccess: validatedMonth,
  } = useValidateClosingFinancialMonthEndpoint();

  const { data: financialMonthData } = useGetFinancialMonthDataEndpoint(
    selectedMonth?.id ?? 0,
    !!selectedMonth,
  );

  const { setDialog: setConfirmationDialog, onClose: closeConfirmationDialog } =
    useConfirmationDialogStore((state) => state);

  const handleValidateMonth = () => {
    validateMonth(selectedMonth?.id ?? 0);
  };

  const handleSelectMonth = (month: FinancialMonth) => {
    setSelectedMonth(month);
  };

  const handleNavigateToDriversSalary = () => {
    closeConfirmationDialog();
    router.push("/dashboard/karbooms/financial-management/drivers-salary");
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: true,
      title: "بستن ماه مالی",
      mainDiscription: `بستن ماه مالی ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonth?.date).month()]}`,
      extraDescription:
        "درحین بستن و پس از بستن ماه مالی امکان تغییر درآمد و هزینه های این ماه وجود ندارد. از وارد کردن تمام درآمد ها و هزینه های این ماه اطمینان حاصل کنید و فرآیند را شروع کنید.",
      icon: <Calendar size={24} className="text-primary" />,
      onConfirm: handleNavigateToDriversSalary,
      onClose: closeConfirmationDialog,
      confirmButtonTitle: `بستن ماه مالی ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonth?.date).month()]}`,
    });
  };

  const handleToggleIncomeDetails = () => {
    setIncomeDetailsOpen((curValue) => !curValue);
  };

  const handleToggleMonthly = () => {
    setIncomeMonthlyOpen((curValue) => !curValue);
  };

  const handleToggleDaily = () => {
    setIncomeDailyOpen((curValue) => !curValue);
  };

  const handleToggleHourly = () => {
    setIncomeHourlyOpen((curValue) => !curValue);
  };

  const handleToggleService = () => {
    setIncomeServiceOpen((curValue) => !curValue);
  };

  useEffect(() => {
    if (validatedMonth) handleOpenConfirmationDialog();
  }, [validatedMonth]);

  const totalIncome =
    financialMonthData?.data.incomes
      .map((income) => income.unit_price * income.quantity)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) ?? 0;

  const incomesGroupedByType = Object.groupBy(
    financialMonthData?.data.incomes ?? [],
    (item) => item.type,
  );

  const totalExpense =
    financialMonthData?.data.expenses
      .map((expense) => expense.unit_price + expense.wage_cost)
      .reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0,
      ) ?? 0;

  return (
    <div className="flex size-full flex-col justify-between">
      <SelectedKarboomInfoComponent />
      <MonthListLayout
        selectedMonth={selectedMonth}
        onSelectMonth={handleSelectMonth}
      />
      <div className="h-dvh min-h-0 flex-1 overflow-y-auto">
        {selectedMonth?.status === "open" ? (
          <>
            <MonthBalanceComponent balance={totalIncome - totalExpense} />
            <ul className="mt-4 flex w-full flex-col gap-4">
              <li
                className={
                  "text-body overflow-y-hidden transition-all duration-300 " +
                  (isIncomeDetailsOpen ? "max-h-1000" : "max-h-14.5")
                }
              >
                <div
                  className="border-secondary flex w-full items-center justify-between rounded-2xl border bg-white p-4"
                  onClick={handleToggleIncomeDetails}
                >
                  <p>درآمد</p>
                  <div className="flex items-center gap-4">
                    <p>{formatNumber(totalIncome)}</p>
                    <Image
                      src="/images/toman-secondary.webp"
                      alt="تومان"
                      width={24}
                      height={24}
                    />
                    <ArrowDown2
                      size="24"
                      className={
                        "transition-all " +
                        (isIncomeDetailsOpen ? "rotate-z-180" : undefined)
                      }
                    />
                  </div>
                </div>
                <ul className="mt-4 flex w-full flex-col gap-4 pr-4">
                  <li
                    className={
                      "text-body overflow-y-hidden transition-all duration-300 " +
                      (isIncomeMonthlyOpen ? "max-h-1000" : "max-h-14.5")
                    }
                  >
                    <div
                      className="border-secondary flex w-full items-center justify-between rounded-2xl border bg-white p-4"
                      onClick={handleToggleMonthly}
                    >
                      <p>ماهانه</p>
                      <div className="flex items-center gap-4">
                        <p>
                          {formatNumber(
                            incomesGroupedByType.monthly
                              ?.map(
                                (income) => income.unit_price * income.quantity,
                              )
                              .reduce(
                                (previousValue, currentValue) =>
                                  previousValue + currentValue,
                                0,
                              ) ?? 0,
                          )}
                        </p>
                        <Image
                          src="/images/toman-secondary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                        <ArrowDown2
                          size="24"
                          className={
                            "transition-all " +
                            (isIncomeMonthlyOpen ? "rotate-z-180" : undefined)
                          }
                        />
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2 pr-4">
                      {incomesGroupedByType.monthly?.map(
                        ({ receiver: { full_name }, unit_price, quantity }) => (
                          <li className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2">
                            <p>{full_name}</p>
                            <div className="flex items-center gap-2">
                              <p>{formatNumber(unit_price * quantity)}</p>
                              <Image
                                src="/images/toman-secondary.webp"
                                alt="تومان"
                                width={24}
                                height={24}
                              />
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                  <li
                    className={
                      "text-body overflow-y-hidden transition-all duration-300 " +
                      (isIncomeDailyOpen ? "max-h-1000" : "max-h-14.5")
                    }
                  >
                    <div
                      className="border-secondary flex w-full items-center justify-between rounded-2xl border p-4"
                      onClick={handleToggleDaily}
                    >
                      <p>روزانه</p>
                      <div className="flex items-center gap-4">
                        <p>
                          {formatNumber(
                            incomesGroupedByType.daily
                              ?.map(
                                (income) => income.unit_price * income.quantity,
                              )
                              .reduce(
                                (previousValue, currentValue) =>
                                  previousValue + currentValue,
                                0,
                              ) ?? 0,
                          )}
                        </p>
                        <Image
                          src="/images/toman-secondary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                        <ArrowDown2
                          size="24"
                          className={
                            "transition-all " +
                            (isIncomeDailyOpen ? "rotate-z-180" : undefined)
                          }
                        />
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2 pr-4">
                      {incomesGroupedByType.daily?.map(
                        ({ receiver: { full_name }, unit_price, quantity }) => (
                          <li className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2">
                            <p>{full_name}</p>
                            <div className="flex items-center gap-2">
                              <p>{formatNumber(unit_price * quantity)}</p>
                              <Image
                                src="/images/toman-secondary.webp"
                                alt="تومان"
                                width={24}
                                height={24}
                              />
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                  <li
                    className={
                      "text-body overflow-y-hidden transition-all duration-300 " +
                      (isIncomeHourlyOpen ? "max-h-1000" : "max-h-14.5")
                    }
                  >
                    <div
                      className="border-secondary flex w-full items-center justify-between rounded-2xl border p-4"
                      onClick={handleToggleHourly}
                    >
                      <p>ساعتی</p>
                      <div className="flex items-center gap-4">
                        <p>
                          {formatNumber(
                            incomesGroupedByType.hourly
                              ?.map(
                                (income) => income.unit_price * income.quantity,
                              )
                              .reduce(
                                (previousValue, currentValue) =>
                                  previousValue + currentValue,
                                0,
                              ) ?? 0,
                          )}
                        </p>
                        <Image
                          src="/images/toman-secondary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                        <ArrowDown2
                          size="24"
                          className={
                            "transition-all " +
                            (isIncomeHourlyOpen ? "rotate-z-180" : undefined)
                          }
                        />
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2 pr-4">
                      {incomesGroupedByType.hourly?.map(
                        ({ receiver: { full_name }, unit_price, quantity }) => (
                          <li className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2">
                            <p>{full_name}</p>
                            <div className="flex items-center gap-2">
                              <p>{formatNumber(unit_price * quantity)}</p>
                              <Image
                                src="/images/toman-secondary.webp"
                                alt="تومان"
                                width={24}
                                height={24}
                              />
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                  <li
                    className={
                      "text-body overflow-y-hidden transition-all duration-300 " +
                      (isIncomeServiceOpen ? "max-h-1000" : "max-h-14.5")
                    }
                  >
                    <div
                      className="border-secondary flex w-full items-center justify-between rounded-2xl border p-4"
                      onClick={handleToggleService}
                    >
                      <p>سرویسی</p>
                      <div className="flex items-center gap-4">
                        <p>
                          {formatNumber(
                            incomesGroupedByType.services
                              ?.map(
                                (income) => income.unit_price * income.quantity,
                              )
                              .reduce(
                                (previousValue, currentValue) =>
                                  previousValue + currentValue,
                                0,
                              ) ?? 0,
                          )}
                        </p>
                        <Image
                          src="/images/toman-secondary.webp"
                          alt="تومان"
                          width={24}
                          height={24}
                        />
                        <ArrowDown2
                          size="24"
                          className={
                            "transition-all " +
                            (isIncomeServiceOpen ? "rotate-z-180" : undefined)
                          }
                        />
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-2 pr-4">
                      {incomesGroupedByType.services?.map(
                        ({ receiver: { full_name }, unit_price, quantity }) => (
                          <li className="text-body border-primary-light flex items-center justify-between rounded-2xl border px-4 py-2">
                            <p>{full_name}</p>
                            <div className="flex items-center gap-2">
                              <p>{formatNumber(unit_price * quantity)}</p>
                              <Image
                                src="/images/toman-secondary.webp"
                                alt="تومان"
                                width={24}
                                height={24}
                              />
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="border-secondary text-body flex items-center justify-between rounded-2xl border p-4">
                <div className="flex w-full items-center justify-between">
                  <p>هزینه</p>
                  <div className="flex items-center gap-4">
                    <p>{formatNumber(totalExpense)}</p>
                    <Image
                      src="/images/toman-secondary.webp"
                      alt="تومان"
                      width={24}
                      height={24}
                    />
                    <ArrowDown2
                      size="24"
                      className={
                        "transition-all " +
                        (isIncomeDetailsOpen ? "rotate-z-180" : undefined)
                      }
                    />
                  </div>
                </div>
              </li>
            </ul>
          </>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            <li className="border-secondary-light flex items-center justify-between rounded-2xl border px-6 py-2">
              <div className="flex items-center gap-2">
                <div className="relative text-green-500">
                  <Money size="24" variant="Broken" />
                  <ArrowCircleUp2
                    size="16"
                    className="absolute -right-5 bottom-0"
                  />
                </div>
                <p className="text-body text-sm">{"امیر الله دادیان"}</p>
              </div>
              <div className="flex items-center gap-1">
                <p>{formatNumber(123456789)}</p>
                <Add size="20" className="text-green-500" />
                <ArrowDown2 size="16" className="text-body" />
              </div>
            </li>
            <li className="border-secondary-light flex items-center justify-between rounded-2xl border px-6 py-2">
              <div className="flex items-center gap-2">
                <div className="relative text-red-500">
                  <Money size="24" variant="Broken" />
                  <ArrowCircleDown2
                    size="16"
                    className="absolute -right-5 bottom-0"
                  />
                </div>
                <p className="text-body text-sm">{"امیر الله دادیان"}</p>
              </div>
              <div className="flex items-center gap-1">
                <p>{formatNumber(987654321)}</p>
                <Minus size="20" className="text-red-500" />
                <ArrowDown2 size="16" className="text-body" />
              </div>
            </li>
          </ul>
        )}
      </div>
      <Button
        variant="contained"
        startIcon={<Lock1 size="20" className="text-white" />}
        endIcon={<span className="text-xs!">اردیبهشت ماه</span>}
        sx={{
          marginTop: "8px",
          justifyContent: "space-between",
        }}
        onClick={handleValidateMonth}
        loading={validatingMonth}
      >
        بستن ماه مالی
      </Button>
    </div>
  );
}
