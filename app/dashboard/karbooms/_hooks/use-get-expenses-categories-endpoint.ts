import { useQuery } from "@tanstack/react-query";
import { karboomService } from "../_services/karboom-service";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";

export default function useGetExpensesCategoriesEndpoint(
  categoryType: ExpenseCategoryTypes,
) {
  return useQuery({
    queryKey: ["expenses-categories", categoryType],
    queryFn: ({ queryKey, signal }) =>
      karboomService.getExpensesCategories(
        queryKey[1] as ExpenseCategoryTypes,
        signal,
      ),
  });
}
