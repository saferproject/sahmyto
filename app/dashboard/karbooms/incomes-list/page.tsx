"use client";

import { useState } from "react";

import IncomesListLayout from "./_layouts/incomes-list-layout";
import IncomeDetailsDrawerLayout from "./_layouts/income-details-drawer-layout";

import RejectDrawerComponent from "../_components/reject-drawer-component";

import { RejectFormType } from "../_schemas/reject-form-schema";

import useRejectIncome from "./_hooks/use-reject-income";
import IncomeDrawerComponent from "../_components/income-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import useRequireKarboomMembers from "../_hooks/use-require-karboom-members";
import ListHeaderLayout from "../_layouts/list-header-layout";
import SettlementDrawerComponent from "../_components/settlement-drawer-component";
import { SettlementFormType } from "../_schemas/settlement-form-schema";
import useSettleIncome from "./_hooks/use-settle-income";
import { formatGregorianDate } from "@/app/_utilities/format-dates";

export default function IncomesListPage() {
  const [isIncomeDetailsDrawerOpen, setIncomeDetailsDrawerOpen] =
    useState<boolean>(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState<boolean>(false);
  const [isIncomeFormDrawerOpen, setIncomeFormDrawerOpen] =
    useState<boolean>(false);
  const [isSettlementDrawerOpen, setSettlementDrawerOpen] =
    useState<boolean>(false);
  const [selectedIncome, setSelectedIncome] = useState<number | null>(null);

  const karboomId = useKarboomsStore((state) => state.id);
  const requireKarboomMembers = useRequireKarboomMembers();

  const { mutate: settleIncome, isPending: settlingIncome } = useSettleIncome();

  const { mutate: rejectIncome, isPending: rejectingIncome } =
    useRejectIncome();

  const handleOpenIncomeDtailsDrawer = () => {
    setIncomeDetailsDrawerOpen(true);
  };

  const handleCloseIncomeDtailsDrawer = () => {
    setIncomeDetailsDrawerOpen(false);
  };

  const handleOpenSettlementDrawer = () => {
    setSettlementDrawerOpen(true);
  };

  const handleCloseSettlementDrawer = () => {
    setSettlementDrawerOpen(false);
  };

  const handleOpenRejectDrawer = () => {
    setRejectDrawerOpen(true);
  };

  const handleCloseRejectDrawer = () => {
    setRejectDrawerOpen(false);
  };

  const handleOpenIncomeForm = () => {
    requireKarboomMembers(karboomId, () => setIncomeFormDrawerOpen(true));
  };

  const handleCloseIncomeForm = () => {
    setIncomeFormDrawerOpen(false);
  };

  const handleSettleIncome = (incomeId: number) => {
    setSelectedIncome(incomeId);
    handleOpenSettlementDrawer();
  };

  const handleSubmitSettlement = ({
    member,
    settlement_date,
    description
  }: SettlementFormType) => {
    if (selectedIncome) {
      settleIncome(
        {
          incomeId: selectedIncome,
          receiver_id: member.member.id,
          settlement_date: formatGregorianDate(settlement_date),
          description
        },
        {
          onSuccess: () => {
            setSelectedIncome(null);
            handleCloseSettlementDrawer();
            handleCloseIncomeDtailsDrawer();
          },
        },
      );
    }
  };

  const handleRejectIncome = (incomeId: number) => {
    setSelectedIncome(incomeId);
    handleOpenRejectDrawer();
  };

  const handleSubmitReject = (data: RejectFormType) => {
    if (selectedIncome)
      rejectIncome(
        { ...data, incomeId: selectedIncome },
        {
          onSuccess: () => {
            setSelectedIncome(null);
            handleCloseRejectDrawer();
            handleCloseIncomeDtailsDrawer();
          },
        },
      );
  };

  return (
    <>
      <ListHeaderLayout title="لیست درآمد ها" />
      <IncomesListLayout
        onShowDetails={handleOpenIncomeDtailsDrawer}
        onSettle={handleSettleIncome}
        onReject={handleRejectIncome}
        onOpenIncomeForm={handleOpenIncomeForm}
      />
      <IncomeDetailsDrawerLayout
        isOpen={isIncomeDetailsDrawerOpen}
        onOpen={handleOpenIncomeDtailsDrawer}
        onClose={handleCloseIncomeDtailsDrawer}
        onRejectIncome={handleRejectIncome}
      />
      <SettlementDrawerComponent
        memberTitle="دریافت کننده"
        title="ثبت تسویه درآمد"
        isOpen={isSettlementDrawerOpen}
        isLoading={settlingIncome}
        onOpen={handleOpenSettlementDrawer}
        onClose={handleCloseSettlementDrawer}
        onSubmit={handleSubmitSettlement}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        isLoading={rejectingIncome}
        title="درآمد"
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
      <IncomeDrawerComponent
        isOpen={isIncomeFormDrawerOpen}
        onOpen={handleOpenIncomeForm}
        onClose={handleCloseIncomeForm}
      />
    </>
  );
}
