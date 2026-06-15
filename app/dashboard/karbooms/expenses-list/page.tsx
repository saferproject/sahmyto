"use client";

import { useState } from "react";

import ExpenseListLayout from "./_layouts/expense-list-layout";
import ExpenseListHeaderLayout from "./_layouts/expense-list-header-layout";
import ExpenseDetailsDrawerLayout from "./_layouts/expense-details-drawer-layout";

import { RejectFormType } from "../_schemas/reject-form-schema";

import RejectDrawerComponent from "../_components/reject-drawer-component";

import useRejectExpense from "./_hooks/use-reject-expense";
import { FilterTag } from "./_types/filter-tag";
import { EXPENSE_FILTER_TAGS } from "./_constants/expense-filter-tags";

export default function ExpensesListPage() {
  const [isExpenseDetailsDrawerOpen, setExpenseDetailsDrawerOpen] =
    useState<boolean>(false);
  const [isRejectDrawerOpen, setRejectDrawerOpen] = useState<boolean>(false);
  const [selectedExpense, setSelectedExpense] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<FilterTag>(
    EXPENSE_FILTER_TAGS[0],
  );

  const { id: tagId } = selectedTag;

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

  const handleTagSelect = (tag: FilterTag) => {
    setSelectedTag(tag);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <ExpenseListHeaderLayout
        selectedTagId={tagId}
        onTagSelect={handleTagSelect}
      />
      <ExpenseListLayout
        onShowDetails={handleOpenExpenseDtailsDrawer}
        onRejectExpense={handleRejectExpense}
      />
      <ExpenseDetailsDrawerLayout
        isOpen={isExpenseDetailsDrawerOpen}
        onOpen={handleOpenExpenseDtailsDrawer}
        onClose={handleCloseExpenseDtailsDrawer}
      />
      <RejectDrawerComponent
        isOpen={isRejectDrawerOpen}
        onOpen={handleOpenRejectDrawer}
        onClose={handleCloseRejectDrawer}
        onSubmit={handleSubmitReject}
      />
    </div>
  );
}
