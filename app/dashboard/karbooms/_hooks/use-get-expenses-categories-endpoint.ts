import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import { karboomService } from "../_services/karboom-service";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";

export default function useGetExpensesCategoriesEndpoint(
  categoryType: ExpenseCategoryTypes,
) {
  return useInfiniteListQuery({
    queryKey: ["expenses-categories", categoryType],
    queryFn: (page, signal, queryKey) =>
      karboomService.getExpensesCategories(
        queryKey[1] as ExpenseCategoryTypes,
        signal,
        page,
      ),
  });
}
