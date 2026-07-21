"use client";

import { useRef, useState } from "react";
import { SwipeableDrawer } from "@mui/material";

import ExpenseDrawerHeaderComponent from "./expense-drawer-header-component";
import ExpenseDrawerCategoryListComponent from "./expense-drawer-list-component";
import ExpenseDrawerFormComponent from "./expense-drawer-form-component";

import { KarboomExpenseDrawerProps } from "../_types/karboom-expense-drawer-props";
import { ExpensesCategoryTypes } from "../_types/expenses-category-types";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

export default function ExpenseDrawerComponent({
  isOpen,
  onOpen,
  onClose,
}: KarboomExpenseDrawerProps) {
  const expenseForm = useRef<HTMLFormElement>(null);

  const [categoryType, setCategoryType] =
    useState<ExpensesCategoryTypes>("daily");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const karboomId = useKarboomsStore((state) => state.id);

  const handleSelectCategoryType = (categoryType: ExpenseCategoryTypes) => {
    setCategoryType(categoryType);
  };

  const handleSelectCategory = (id: number) => {
    setSelectedCategory(id);

    if (expenseForm.current)
      expenseForm.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleClose = () => {
    setCategoryType("daily");
    setSelectedCategory(null);
    onClose();
  };

  const handleSuccess = () => {
    handleClose();
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={isOpen}
      onOpen={onOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            borderRadius: "32px 32px 0 0",
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      }}
    >
      <div className="relative flex max-h-[90dvh] w-full flex-col px-8 py-12">
        <div className="bg-secondary-light absolute top-6 left-1/2 h-2 w-16 -translate-x-1/2 rounded-full"></div>
        <div className="flex min-h-0 w-full flex-1 flex-col items-center">
          <div className="mb-4 flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
            <ExpenseDrawerHeaderComponent />
            <ExpenseDrawerCategoryListComponent
              categoryType={categoryType}
              selectedCategory={selectedCategory}
              onSelectCategoryType={handleSelectCategoryType}
              onSelectCategory={handleSelectCategory}
            />
            <ExpenseDrawerFormComponent
              isOpen={isOpen}
              karboomId={karboomId}
              expenseFormRef={expenseForm}
              categoryType={categoryType}
              selectedCategory={selectedCategory}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
}
