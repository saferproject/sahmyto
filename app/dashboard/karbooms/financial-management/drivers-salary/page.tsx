"use client";

import Image from "next/image";

import { useState } from "react";
import { Button } from "@mui/material";
import { MoneyRecive } from "iconsax-reactjs";

import QueryState from "@/app/_components/query-state";
import DriverTipDrawerComponent from "./_components/driver-tip-drawer-component";
import DetailItemComponent from "../../incomes-list/_components/income-detail-item-component";

import formatNumber from "@/app/_utilities/format-numbers";

import useGetDriversSalaryEndpoint from "./_hooks/use-get-drivers-salaries-endpoint";

import { useFinancialMonthStore } from "../_providers/financial-managment-store-provider";

export default function DriversSalaryPage() {
  const [isDriverTipDrawerOpen, setDriverTipDrawerOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);

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

  return (
    <div className="w-full">
      <DriverTipDrawerComponent
        isOpen={isDriverTipDrawerOpen}
        driverId={selectedDriver ?? 0}
        onOpen={handleOpenDriverTip}
        onClose={handleCloseDriverTip}
      />
      <div className="flex items-center gap-2">
        <MoneyRecive size="32" className="text-primary" />
        <h3 className="text-body text-lg font-semibold">
          محاسبه حقوق رانندگان
        </h3>
      </div>
      <QueryState
        isLoading={gettingDriversSalaries}
        isError={gettingDriversSalariesFailed}
        isEmpty={!DriversSalaries?.data.length}
      >
        <ul className="mt-10 w-full">
          <li className="border-secondary relative flex w-full flex-col rounded-2xl border p-4 pt-8">
            <div className="border-primary absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full border bg-white">
              {/* <Image src={} /> */}
            </div>
            <ul className="flex flex-col gap-3">
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
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="contained"
                size="large"
                color="success"
                onClick={() => setSelectedDriver(id)}
                fullWidth
              >
                ثبت انعام
              </Button>
              <Button
                variant="contained"
                size="large"
                color="error"
                onClick={() => setSelectedDriver(id)}
                fullWidth
              >
                ثبت جریمه
              </Button>
            </div>
          </li>
        </ul>
      </QueryState>
    </div>
  );
}
