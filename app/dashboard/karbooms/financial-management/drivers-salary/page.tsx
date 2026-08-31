"use client";

import Image from "next/image";

import { useState } from "react";
import { Button } from "@mui/material";
import { Calendar, User } from "iconsax-reactjs";

import QueryState from "@/app/_components/query-state";
import DriverTipDrawerComponent from "./_components/driver-tip-drawer-component";
import DetailItemComponent from "@/app/_components/detail-item-component";

import formatNumber from "@/app/_utilities/format-numbers";

import useGetDriversSalaryEndpoint from "./_hooks/use-get-drivers-salaries-endpoint";

import { useFinancialMonthStore } from "../_providers/financial-managment-store-provider";
import type { BonusPenaltyType } from "./_types/bonus-penalty-type";
import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";
import organizeDriverSalary from "./_utilities/organize-driver-salary";
import sumSalaryAmounts from "./_utilities/sum-salary-amounts";
import ListHeaderLayout from "../../_layouts/list-header-layout";
import { JALALI_CALENDAR_MONTHS_FA } from "@/app/_constants/jalali-calendar-months-fa";
import { useConfirmationDialogStore } from "@/app/dashboard/_providers/confirmation-dialog-provider";
import useCloseFinancialMonth from "../_hooks/use-close-financial-month-endpoint";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function DriversSalaryPage() {
  const router = useRouter();

  const [isDriverTipDrawerOpen, setDriverTipDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [bonusPenaltyType, setBonusPenaltyType] =
    useState<BonusPenaltyType>("bonus");

  const financialMonthId = useFinancialMonthStore((state) => state.id);
  const selectedMonthDate = useFinancialMonthStore((state) => state.date);

  const {
    data: DriversSalaries,
    isLoading: gettingDriversSalaries,
    isError: gettingDriversSalariesFailed,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetDriversSalaryEndpoint(financialMonthId);

  const { mutate: closeFinancialMonth } = useCloseFinancialMonth();

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

  const handleOpenDriverTip = () => {
    setDriverTipDrawerOpen(true);
  };

  const handleCloseDriverTip = () => {
    setDriverTipDrawerOpen(false);
  };

  const handleAddBonus = (id: number) => {
    setSelectedDriver(id);
    setBonusPenaltyType("bonus");
    handleOpenDriverTip();
  };

  const handleAddPenalty = (id: number) => {
    setSelectedDriver(id);
    setBonusPenaltyType("penalty");
    handleOpenDriverTip();
  };

  const handleSwitchTipType = () => {
    setBonusPenaltyType((curValue) =>
      curValue === "bonus" ? "penalty" : "bonus",
    );
  };

  const handleCloseFinancialMonth = () => {
    closeFinancialMonth(financialMonthId, {
      onSuccess: () => {
        closeConfirmationDialog();
        router.push("/dashboard/karbooms/financial-management");
      },
      onSettled: () => {
        stopPendingConfirmation();
      },
    });
    startPendingConfirmation();
  };

  const handleOpenConfirmationDialog = () => {
    setConfirmationDialog({
      isOpen: true,
      isPending: false,
      title: "بستن ماه مالی",
      mainDiscription: `بستن ماه مالی ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonthDate).month()]}`,
      extraDescription:
        "درحین بستن و پس از بستن ماه مالی امکان تغییر درآمد و هزینه های این ماه وجود ندارد. از وارد کردن تمام درآمد ها و هزینه های این ماه اطمینان حاصل کنید و فرآیند را شروع کنید.",
      icon: <Calendar size={24} className="text-primary" />,
      onConfirm: handleCloseFinancialMonth,
      onClose: closeConfirmationDialog,
      confirmButtonTitle: `بستن ماه ${JALALI_CALENDAR_MONTHS_FA[dayjs(selectedMonthDate).month()]}`,
    });
  };

  const organizedDriverSalaries =
    DriversSalaries?.data.map(organizeDriverSalary) ?? [];

  return (
    <>
      <DriverTipDrawerComponent
        isOpen={isDriverTipDrawerOpen}
        driverId={selectedDriver ?? 0}
        bonusPenaltyType={bonusPenaltyType}
        onOpen={handleOpenDriverTip}
        onClose={handleCloseDriverTip}
        onSwitchType={handleSwitchTipType}
      />
      <ListHeaderLayout title="محاسبه حقوق رانندگان" />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={gettingDriversSalaries}
        isError={gettingDriversSalariesFailed}
        isEmpty={!DriversSalaries?.data.length}
      >
        <ul className="mt-10 w-full">
          {organizedDriverSalaries?.map(
            ({
              id,
              avatar,
              full_name,
              bonuses,
              penalties,
              salaries: { fixed, percentage, service },
            }) => {
              const fixedTotal = sumSalaryAmounts(fixed);
              const percentageTotal = sumSalaryAmounts(percentage);
              const serviceTotal = sumSalaryAmounts(service);
              const bonusTotal = sumSalaryAmounts(bonuses);
              const penaltyTotal = sumSalaryAmounts(penalties);
              const salaryTotal = fixedTotal + percentageTotal + serviceTotal;
              const totalAmount = salaryTotal + bonusTotal - penaltyTotal;

              return (
                <li
                  key={id}
                  className="border-secondary relative flex w-full flex-col rounded-2xl border p-4 pt-8"
                >
                  <div className="border-primary absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border bg-white">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={full_name ?? ""}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <User className="text-secondary-light" />
                    )}
                  </div>
                  <ul className="flex flex-col gap-3">
                    <DetailItemComponent label="نام راننده" value={full_name} />
                    <DetailItemComponent
                      label="دستمزد ثابت"
                      value={formatNumber(fixedTotal)}
                    />
                    <DetailItemComponent
                      label="دستمزد درصدی"
                      value={formatNumber(percentageTotal)}
                    />
                    <DetailItemComponent
                      label="دستمزد سرویسی"
                      value={formatNumber(serviceTotal)}
                    />
                    <DetailItemComponent
                      label="پاداش"
                      value={formatNumber(bonusTotal)}
                    />
                    <DetailItemComponent
                      label="جریمه"
                      value={
                        <span dir="ltr">
                          {formatNumber(penaltyTotal === 0 ? 0 : -penaltyTotal)}
                        </span>
                      }
                    />
                    <DetailItemComponent
                      label="مجموع"
                      value={formatNumber(totalAmount)}
                    />
                  </ul>
                  <div className="mt-4 flex items-center gap-2">
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      onClick={() => handleAddBonus(id)}
                      fullWidth
                    >
                      ثبت انعام
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      color="error"
                      onClick={() => handleAddPenalty(id)}
                      fullWidth
                    >
                      ثبت جریمه
                    </Button>
                  </div>
                </li>
              );
            },
          )}
        </ul>
        <InfiniteScrollTrigger
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
        <Button variant="contained" onClick={handleOpenConfirmationDialog}>
          تایید حقوق رانندگان
        </Button>
      </QueryState>
    </>
  );
}
