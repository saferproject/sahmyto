"use client";

import { useRef, useState } from "react";

import FormDrawerComponent from "@/app/_components/form-drawer-component";

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
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={handleClose}>
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
    </FormDrawerComponent>
  );
}
