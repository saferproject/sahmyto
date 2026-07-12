"use client";

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

import formatNumber from "@/app/_utilities/format-numbers";

import MonthListLayout from "./_layouts/months-list-layout";

import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";

import useValidateClosingFinancialMonthEndpoint from "./_hooks/use-validate-closing-financial-month-endpoint";

import { useConfirmationDialogStore } from "../../_providers/confirmation-dialog-provider";

import { FinancialMonth } from "./_types/financial-month";
import dayjs from "dayjs";
import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";

export default function FinancialManagementPage() {
  const [selectedMonth, setSelectedMonth] = useState<null | FinancialMonth>(
    null,
  );

  const {
    mutate: validateMonth,
    isPending: validatingMonth,
    isSuccess: validatedMonth,
  } = useValidateClosingFinancialMonthEndpoint();

  const { setDialog: setConfirmationDialog, onClose: closeConfirmationDialog } =
    useConfirmationDialogStore((state) => state);

  const handleValidateMonth = () => {
    validateMonth(selectedMonth?.id ?? 0);
  };

  const handleSelectMonth = (month: FinancialMonth) => {
    setSelectedMonth(month);
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: true,
      title: "بستن ماه مالی",
      mainDiscription: `شما درحال بستن ماه مالی ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonth?.date).month()]} هستید`,
      extraDescription:
        "درحین بستن و پس از بستن ماه مالی امکان تغییر در درآمد و هزینه های این ماه وجود ندارد. از وارد کردن تمام درآمد ها و هزینه های این ماه اطمینان حاصل کنید و فرآیند را شروع کنید.",
      icon: <Calendar size={48} className="text-primary" />,
      onConfirm: () => {},
      onClose: closeConfirmationDialog,
      confirmButtonTitle: `بستن ماه مالی ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonth?.date).month()]}`,
    });
  };

  useEffect(() => {
    if (validatedMonth) handleOpenConfirmationDialog();
  }, [validatedMonth]);

  return (
    <div className="flex size-full flex-col justify-between">
      <div className="h-dvh min-h-0 flex-1">
        <SelectedKarboomInfoComponent />
        <MonthListLayout
          selectedMonth={selectedMonth}
          onSelectMonth={handleSelectMonth}
        />
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
