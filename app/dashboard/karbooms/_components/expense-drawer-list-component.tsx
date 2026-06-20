import { EXPENSE_CATEGORY_TYPES } from "../_constants/expense-category-types";
import useGetExpensesCategories from "../_hooks/get-expenses-categories-endpoint";
import { ExpenseDrawerCategoryListProps } from "../_types/expense-drawer-category-list-props";
import CategoryTypeComponent from "./category-type-component";

import ExpenseDrawerListItemComponent from "./expense-drawer-list-item-component";

export default function ExpenseDrawerCategoryListComponent({
  categoryType,
  selectedCategory,
  onSelectCategoryType,
  onSelectCategory,
}: ExpenseDrawerCategoryListProps) {
  const { data } = useGetExpensesCategories(categoryType);

  return (
    <div className="mb-8 flex w-full flex-col items-center gap-4 py-1">
      <p className="text-body text-xs relative">
        نوع هزینه را انتخاب کنید
      </p>
      <div className="mb-4 flex w-full items-center justify-between gap-4">
        {EXPENSE_CATEGORY_TYPES.map(({ id, ...other }) => (
          <CategoryTypeComponent
            key={id}
            {...other}
            selectedCategoryType={categoryType}
            onSelectCategoryType={onSelectCategoryType}
          />
        ))}
      </div>
      <p className="text-body text-xs relative">
        دسته هزینه را انتخاب کنید
      </p>
      <div className="grid w-full grid-cols-3 gap-2">
        {data?.data.map((expenseCategory) => (
          <ExpenseDrawerListItemComponent
            key={expenseCategory.id}
            {...expenseCategory}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </div>
    </div>
  );
}
