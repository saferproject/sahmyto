"use client";

import Image from "next/image";

import { useState } from "react";
import { Button } from "@mui/material";
import { User } from "iconsax-reactjs";

import QueryState from "@/app/_components/query-state";
import DriverTipDrawerComponent from "./_components/driver-tip-drawer-component";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";

import formatNumber from "@/app/_utilities/format-numbers";

import useGetDriversSalaryEndpoint from "./_hooks/use-get-drivers-salaries-endpoint";

import { useFinancialMonthStore } from "../_providers/financial-managment-store-provider";
import type { BonusPenaltyType } from "./_types/bonus-penalty-type";
import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";
import organizeDriverSalary from "./_utilities/organize-driver-salary";
import sumSalaryAmounts from "./_utilities/sum-salary-amounts";
import ListHeaderLayout from "../../_layouts/list-header-layout";

export default function DriversSalaryPage() {
  const [isDriverTipDrawerOpen, setDriverTipDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [bonusPenaltyType, setBonusPenaltyType] =
    useState<BonusPenaltyType>("bonus");

  const financialMonthId = useFinancialMonthStore((state) => state.id);

  const {
    data: DriversSalaries,
    isLoading: gettingDriversSalaries,
    isError: gettingDriversSalariesFailed,
  } = useGetDriversSalaryEndpoint(financialMonthId);

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
                      value={formatNumber(
                        penaltyTotal === 0 ? 0 : -penaltyTotal,
                      )}
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
      </QueryState>
    </>
  );
}
