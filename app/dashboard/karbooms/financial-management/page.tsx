"use client";

import formatNumber from "@/app/_utilities/format-numbers";
import { Button } from "@mui/material";
import {
  Key,
  Lock,
  Money,
  ArrowCircleUp2,
  ArrowDown2,
  Minus,
  Add,
  ArrowCircleDown2,
  Lock1,
} from "iconsax-reactjs";
import MonthListLayout from "./_layouts/months-list-layout";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";

export default function FinancialManagementPage() {
  return (
    <div className="flex size-full flex-col justify-between">
      <div className="h-dvh min-h-0 flex-1">
        <SelectedKarboomInfoComponent />
        <MonthListLayout />
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
      >
        بستن ماه مالی
      </Button>
    </div>
  );
}
