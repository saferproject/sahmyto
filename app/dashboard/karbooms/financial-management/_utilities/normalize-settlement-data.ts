import type {
  SettlementBreakdown,
  SettlementBreakdownResponse,
  SettlementData,
  SettlementDataResponse,
  SettlementExpenseCategory,
  SettlementExpenseCategoryResponse,
  SettlementGroup,
  SettlementGroupResponse,
} from "../_types/settlement-data";

function normalizeSettlementGroup<T>(
  group: SettlementGroupResponse<T>,
): SettlementGroup<T> {
  const items = Object.keys(group)
    .filter((key) => key !== "total" && Number.isInteger(Number(key)))
    .sort((firstKey, secondKey) => Number(firstKey) - Number(secondKey))
    .map((key) => group[Number(key)]);

  return { total: group.total, items };
}

function normalizeSettlementExpenseGroup(
  group: SettlementGroupResponse<SettlementExpenseCategoryResponse>,
): SettlementGroup<SettlementExpenseCategory> {
  const normalizedGroup = normalizeSettlementGroup(group);

  return {
    ...normalizedGroup,
    items: normalizedGroup.items.map((item) => ({
      ...item,
      expenses: item.expenses.map((expense) => ({
        ...expense,
        category_name: item.category.name,
      })),
    })),
  };
}

function normalizeSettlementBreakdown(
  breakdown: SettlementBreakdownResponse,
): SettlementBreakdown {
  return {
    previous_settlement: normalizeSettlementGroup(
      breakdown.previous_settlement,
    ),
    profit_loss: normalizeSettlementGroup(breakdown.profit_loss),
    expenses_issued: normalizeSettlementExpenseGroup(breakdown.expenses_issued),
    expenses_paid: normalizeSettlementExpenseGroup(breakdown.expenses_paid),
    payments_received: normalizeSettlementGroup(breakdown.payments_received),
    payments_made: normalizeSettlementGroup(breakdown.payments_made),
    payments_registered: normalizeSettlementGroup(
      breakdown.payments_registered,
    ),
    incomes_received: normalizeSettlementGroup(breakdown.incomes_received),
    salary: normalizeSettlementGroup(breakdown.salary),
    service_fee: normalizeSettlementGroup(breakdown.service_fee),
  };
}

export default function normalizeSettlementData(
  data: SettlementDataResponse,
): SettlementData {
  return {
    ...data,
    members: data.members.map((member) => ({
      ...member,
      breakdown: normalizeSettlementBreakdown(member.breakdown),
    })),
  };
}
