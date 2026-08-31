import { EXPENSE_CATEGORY_TYPES } from "../_constants/expense-category-types";
import useGetExpensesCategoriesEndpoint from "../_hooks/use-get-expenses-categories-endpoint";
import { ExpenseDrawerCategoryListProps } from "../_types/expense-drawer-category-list-props";
import CategoryTypeComponent from "./category-type-component";

import ExpenseDrawerListItemComponent from "./expense-drawer-list-item-component";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function ExpenseDrawerCategoryListComponent({
  categoryType,
  selectedCategory,
  onSelectCategoryType,
  onSelectCategory,
}: ExpenseDrawerCategoryListProps) {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetExpensesCategoriesEndpoint(categoryType);

  return (
    <div className="mb-8 flex w-full flex-col items-center gap-4 py-1">
      <p className="text-body relative text-xs">نوع هزینه را انتخاب کنید</p>
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
      <p className="text-body relative text-xs">دسته هزینه را انتخاب کنید</p>
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
      <InfiniteScrollTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
}
