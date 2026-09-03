import useListQuery from "@/app/_hooks/use-list-query";
import { karboomService } from "../_services/karboom-service";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";

export default function useGetExpensesCategoriesEndpoint(
  categoryType: ExpenseCategoryTypes,
) {
  return useListQuery(
    ["expenses-categories", "unpaginated", categoryType],
    (signal) => karboomService.getExpensesCategories(categoryType, signal),
  );
}
