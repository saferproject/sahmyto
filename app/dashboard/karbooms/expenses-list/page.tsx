"use client";

import { useState } from "react";

import ExpenseListLayout from "./_layouts/expense-list-layout";
import ExpenseDetailsDrawerLayout from "./_layouts/expense-details-drawer-layout";

import { RejectFormType } from "../_schemas/reject-form-schema";

import RejectDrawerComponent from "../_components/reject-drawer-component";

import useRejectExpense from "./_hooks/use-reject-expense";
import ExpenseDrawerComponent from "../_components/expense-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import useRequireKarboomMembers from "../_hooks/use-require-karboom-members";
import ListHeaderLayout from "../_layouts/list-header-layout";
import SettlementDrawerComponent from "../_components/settlement-drawer-component";
import { SettlementFormType } from "../_schemas/settlement-form-schema";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import useSettleExpense from "./_hooks/use-settle-expense";

export default function ExpensesListPage() {
  const [isExpenseDetailsDrawerOpen, setExpenseDetailsDrawerOpen] =
    useState<boolean>(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);
  const [isExpenseFormDrawerOpen, setExpenseFormDrawerOpen] =
    useState<boolean>(false);
  const [isSettlementDrawerOpen, setSettlementDrawerOpen] =
    useState<boolean>(false);

  const karboomId = useKarboomsStore((state) => state.id);
  const requireKarboomMembers = useRequireKarboomMembers();

  const { mutate: settleIncome, isPending: settlingIncome } = useSettleExpense();

  const { mutate: rejectExpense, isPending: rejectingExpense } =
    useRejectExpense();

  const handleOpenExpenseDtailsDrawer = () => {
    setExpenseDetailsDrawerOpen(true);
  };

  const handleCloseExpenseDtailsDrawer = () => {
    setExpenseDetailsDrawerOpen(false);
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

  const handleRejectExpense = (incomeId: number) => {
    setSelectedExpense(incomeId);
    handleOpenRejectDrawer();
  };

  const handleSettleExpense = (expenseId: number) => {
    setSelectedExpense(expenseId);
    handleOpenSettlementDrawer();
  };

  const handleSubmitSettlement = ({
    member,
    settlement_date,
    description,
  }: SettlementFormType) => {
    if (selectedExpense) {
      settleIncome(
        {
          expenseId: selectedExpense,
          payer_id: member.member.id,
          settlement_date: formatGregorianDate(settlement_date),
          description,
        },
        {
          onSuccess: () => {
            setSelectedExpense(null);
            handleCloseSettlementDrawer();
            handleCloseExpenseDtailsDrawer();
          },
        },
      );
    }
  };

  const handleSubmitReject = (data: RejectFormType) => {
    if (selectedExpense)
      rejectExpense(
        { ...data, expenseId: selectedExpense },
        {
          onSuccess: () => {
            setSelectedExpense(null);
            handleCloseRejectDrawer();
          },
        },
      );
  };

  const handleOpenExpenseForm = () => {
    requireKarboomMembers(karboomId, () => setExpenseFormDrawerOpen(true));
  };

  const handleCloseExpenseForm = () => {
    setExpenseFormDrawerOpen(false);
  };

  return (
    <>
      <ListHeaderLayout title="لیست هزینه ها" />
      <ExpenseListLayout
        onShowDetails={handleOpenExpenseDtailsDrawer}
        onSettle={handleSettleExpense}
        onReject={handleRejectExpense}
        onOpenExpenseForm={handleOpenExpenseForm}
      />
      <ExpenseDetailsDrawerLayout
        isOpen={isExpenseDetailsDrawerOpen}
        onOpen={handleOpenExpenseDtailsDrawer}
        onClose={handleCloseExpenseDtailsDrawer}
        onRejectExpense={handleRejectExpense}
      />
      <SettlementDrawerComponent
        memberTitle="پرداخت کننده"
        title="ثبت تسویه هزینه"
        isOpen={isSettlementDrawerOpen}
        isLoading={settlingIncome}
        onOpen={handleOpenSettlementDrawer}
        onClose={handleCloseSettlementDrawer}
        onSubmit={handleSubmitSettlement}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        isLoading={rejectingExpense}
        title="هزینه"
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
      <ExpenseDrawerComponent
        isOpen={isExpenseFormDrawerOpen}
        onOpen={handleOpenExpenseForm}
        onClose={handleCloseExpenseForm}
      />
    </>
  );
}
