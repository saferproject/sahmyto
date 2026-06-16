"use client";

import { useState } from "react";

import IncomesListLayout from "./_layouts/incomes-list-layout";
import IncomesListHeaderLayout from "./_layouts/incomes-list-header-layout";
import IncomeDetailsDrawerLayout from "./_layouts/income-details-drawer-layout";

import RejectDrawerComponent from "../_components/reject-drawer-component";

import { RejectFormType } from "../_schemas/reject-form-schema";

import useRejectIncome from "./_hooks/use-reject-income";
import IncomeDrawerComponent from "../_components/income-drawer-component";

export default function IncomesListPage() {
  const [isIncomeDetailsDrawerOpen, setIncomeDetailsDrawerOpen] =
    useState<boolean>(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState<boolean>(false);
  const [isIncomeFormDrawerOpen, setIncomeFormDrawerOpen] =
    useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<number | null>(null);

  const { mutate } = useRejectIncome();

  const handleOpenIncomeDtailsDrawer = () => {
    setIncomeDetailsDrawerOpen(true);
  };

  const handleCloseIncomeDtailsDrawer = () => {
    setIncomeDetailsDrawerOpen(false);
  };

  const handleOpenRejectDrawer = () => {
    setRejectDrawerOpen(true);
  };

  const handleCloseRejectDrawer = () => {
    setRejectDrawerOpen(false);
  };

  const handleOpenIncomeForm = () => {
    setIncomeFormDrawerOpen(true);
  };

  const handleCloseIncomeForm = () => {
    setIncomeFormDrawerOpen(false);
  };

  const handleRejectIncome = (incomeId: number) => {
    setSelectedIncome(incomeId);
    handleOpenRejectDrawer();
  };

  const handleSubmitReject = (data: RejectFormType) => {
    if (selectedIncome)
      mutate(
        { ...data, incomeId: selectedIncome },
        {
          onSuccess: () => {
            setSelectedIncome(null);
            handleCloseRejectDrawer();
          },
        },
      );
  };

  return (
    <div className="h-full w-full">
      <IncomesListHeaderLayout />
      <IncomesListLayout
        onShowDetails={handleOpenIncomeDtailsDrawer}
        onRejectIncome={handleRejectIncome}
        onOpenIncomeForm={handleOpenIncomeForm}
      />
      <IncomeDetailsDrawerLayout
        isOpen={isIncomeDetailsDrawerOpen}
        onOpen={handleOpenIncomeDtailsDrawer}
        onClose={handleCloseIncomeDtailsDrawer}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
      <IncomeDrawerComponent
        isOpen={isIncomeFormDrawerOpen}
        onOpen={handleOpenIncomeForm}
        onClose={handleCloseIncomeForm}
      />
    </div>
  );
}
