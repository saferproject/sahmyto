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

export default function ExpensesListPage() {
  const [isExpenseDetailsDrawerOpen, setExpenseDetailsDrawerOpen] =
    useState<boolean>(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);
  const [isExpenseFormDrawerOpen, setExpenseFormDrawerOpen] =
    useState<boolean>(false);

  const karboomId = useKarboomsStore((state) => state.id);
  const requireKarboomMembers = useRequireKarboomMembers();

  const { mutate } = useRejectExpense();

  const handleOpenExpenseDtailsDrawer = () => {
    setExpenseDetailsDrawerOpen(true);
  };

  const handleCloseExpenseDtailsDrawer = () => {
    setExpenseDetailsDrawerOpen(false);
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

  const handleSubmitReject = (data: RejectFormType) => {
    if (selectedExpense)
      mutate(
        { ...data, expenseId: selectedExpense },
        {
          onSuccess: () => {
            setSelectedExpense(null);
            handleCloseRejectDrawer();
          },
        },
      );
    // TODO show a warning alert
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
        onRejectExpense={handleRejectExpense}
        onOpenExpenseForm={handleOpenExpenseForm}
      />
      <ExpenseDetailsDrawerLayout
        isOpen={isExpenseDetailsDrawerOpen}
        onOpen={handleOpenExpenseDtailsDrawer}
        onClose={handleCloseExpenseDtailsDrawer}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
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
