"use client";

import { Button } from "@mui/material";
import {
  Add,
  ArrowCircleDown2,
  ArrowCircleUp2,
  ArrowDown2,
  Calendar,
  Lock1,
  Minus,
  Money,
} from "iconsax-reactjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import QueryState from "@/app/_components/query-state";
import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";
import formatNumber from "@/app/_utilities/format-numbers";
import { useConfirmationDialogStore } from "../../_providers/confirmation-dialog-provider";
import ListHeaderLayout from "../_layouts/list-header-layout";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import MonthBalanceComponent from "./_components/month-balance-component";
import OpenFinancialMonthDetails from "./_components/open-financial-month-details";
import useGetFinancialMonthDataEndpoint from "./_hooks/use-get-financial-month-data-endpoint";
import useGetSettlementData from "./_hooks/use-get-settlement-data-endpoint";
import useStartProcessingFinancialMonthEndpoint from "./_hooks/use-start-processing-financial-month-endpoint";
import useValidateClosingFinancialMonthEndpoint from "./_hooks/use-validate-closing-financial-month-endpoint";
import MonthListLayout from "./_layouts/months-list-layout";
import SettlementDetailsDrawerLayout from "./_layouts/settlement-details-layout";
import { useFinancialMonthStore } from "./_providers/financial-managment-store-provider";
import type { FinancialMonth } from "./_types/financial-month";
import createFinancialMonthSummary from "./_utilities/create-financial-month-summary";
import { useSnackbar } from "notistack";
import { useShallow } from "zustand/react/shallow";

export default function FinancialManagementPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isSettlementDetailsDrawerOpen, setSettlementDetailsDrawerOpen] =
    useState(false);

  const selectedMonth = useFinancialMonthStore(
    useShallow(
      ({
        id,
        karboom_id,
        date,
        status,
        closed_at,
        created_at,
        updated_at,
      }) => ({
        id,
        karboom_id,
        date,
        status,
        closed_at,
        created_at,
        updated_at,
      }),
    ),
  );
  const setSelectedMonth = useFinancialMonthStore(
    (state) => state.setFinancialMonth,
  );

  const { mutate: validateMonth, isPending: validatingMonth } =
    useValidateClosingFinancialMonthEndpoint();
  const { mutate: startProcessing } =
    useStartProcessingFinancialMonthEndpoint();

  const {
    data: financialMonthData,
    isPending: gettingFinancialMonthData,
    isError: gettingFinancialMonthDataFailed,
  } = useGetFinancialMonthDataEndpoint(
    selectedMonth.id,
    !!selectedMonth.id || selectedMonth.status !== "open",
  );
  const {
    data: settlementData,
    isPending: gettingSettlementData,
    isError: gettingSettlementDataFailed,
  } = useGetSettlementData(
    selectedMonth.id,
    !!selectedMonth.id || selectedMonth.status !== "closed",
  );

  const startPendingConfirmation = useConfirmationDialogStore(
    (state) => state.startPending,
  );
  const stopPendingConfirmation = useConfirmationDialogStore(
    (state) => state.stopPending,
  );
  const setConfirmationDialog = useConfirmationDialogStore(
    (state) => state.setDialog,
  );
  const closeConfirmationDialog = useConfirmationDialogStore(
    (state) => state.closeDialog,
  );

  const summary = useMemo(
    () => createFinancialMonthSummary(financialMonthData?.data),
    [financialMonthData?.data],
  );

  const handleValidateMonth = () => {
    if (selectedMonth)
      validateMonth(selectedMonth.id, {
        onSuccess: handleOpenConfirmationDialog,
      });
    else
      enqueueSnackbar({
        variant: "warning",
        message: "ماه مالی را انتخاب کنید",
      });
  };

  const handleSelectMonth = useCallback(
    (month: FinancialMonth) => {
      setSelectedMonth(month);
    },
    [setSelectedMonth],
  );

  const handleNavigateToDriversSalary = () => {
    closeConfirmationDialog();
    router.push("/dashboard/karbooms/financial-management/drivers-salary");
  };

  const handleStartProcessingFinancialMonth = () => {
    startPendingConfirmation();
    startProcessing(selectedMonth.id, {
      onSuccess: handleNavigateToDriversSalary,
      onSettled: stopPendingConfirmation,
    });
  };

  const handleOpenConfirmationDialog = () => {
    const monthName =
      JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonth.date).month()];

    setConfirmationDialog({
      isOpen: true,
      isPending: false,
      title: "بستن ماه مالی",
      mainDiscription: `بستن ماه مالی ${monthName}`,
      extraDescription:
        "درحین بستن و پس از بستن ماه مالی امکان تغییر درآمد و هزینه های این ماه وجود ندارد. از وارد کردن تمام درآمد ها و هزینه های این ماه اطمینان حاصل کنید و فرآیند را شروع کنید.",
      icon: <Calendar size={24} className="text-primary" />,
      onConfirm: handleStartProcessingFinancialMonth,
      onClose: closeConfirmationDialog,
      confirmButtonTitle: `بستن ماه ${monthName}`,
    });
  };

  const handleOpenSettlementDetailDrawer = () => {
    setSettlementDetailsDrawerOpen(true);
  };

  const handleCloseSettlementDetailDrawer = () => {
    setSettlementDetailsDrawerOpen(false);
  };

  return (
    <>
      <ListHeaderLayout title="مدیریت ماه مالی" />
      <SelectedKarboomInfoComponent />
      <MonthListLayout
        selectedMonth={selectedMonth}
        onSelectMonth={handleSelectMonth}
      />
      <QueryState
        isLoading={gettingFinancialMonthData || gettingSettlementData}
        isError={gettingFinancialMonthDataFailed || gettingSettlementDataFailed}
        isEmpty={!financialMonthData?.data || !settlementData?.data}
      >
        {selectedMonth.status === "open" ? (
          <>
            <MonthBalanceComponent
              balance={summary.totalIncome - summary.totalExpense}
            />
            <OpenFinancialMonthDetails summary={summary} />
          </>
        ) : selectedMonth.status === "processing" ? (
          <div className="flex w-full flex-col items-center justify-between gap-4">
            <p className="text-body mt-8">شما در حال بستن این ماه مالی هستید</p>
            <Button
              variant="contained"
              onClick={handleNavigateToDriversSalary}
              sx={{ marginTop: "16px" }}
            >
              بررسی حقوق رانندگان
            </Button>
          </div>
        ) : (
          <>
            <SettlementDetailsDrawerLayout
              isOpen={isSettlementDetailsDrawerOpen}
              onOpen={handleOpenSettlementDetailDrawer}
              onClose={handleCloseSettlementDetailDrawer}
            />
            <MonthBalanceComponent
              balance={summary.totalIncome - summary.totalExpense}
            />
            <ul className="flex w-full flex-col gap-4">
              <li
                className="border-secondary-light flex items-center justify-between rounded-2xl border px-6 py-2"
                onClick={handleOpenSettlementDetailDrawer}
              >
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
                  <p>{formatNumber(123_456_789)}</p>
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
                  <p>{formatNumber(987_654_321)}</p>
                  <Minus size="20" className="text-red-500" />
                  <ArrowDown2 size="16" className="text-body" />
                </div>
              </li>
              <Button
                variant="contained"
                startIcon={<Lock1 size="20" className="text-white" />}
                endIcon={
                  <span className="text-xs!">
                    {
                      JALALI_CALENDAR_MONTHS_FA[
                        dayjs(selectedMonth.date).month()
                      ]
                    }{" "}
                    ماه
                  </span>
                }
                sx={{ marginTop: "8px", justifyContent: "space-between" }}
                onClick={handleValidateMonth}
                loading={validatingMonth}
              >
                بستن ماه مالی
              </Button>
            </ul>
          </>
        )}
      </QueryState>
    </>
  );
}
