import type {
  SettlementBreakdown,
  SettlementBreakdownResponse,
  SettlementData,
  SettlementDataResponse,
  SettlementExpenseCategory,
  SettlementExpenseCategoryResponse,
  SettlementGroup,
} from "../_types/settlement-data";

function normalizeSettlementExpenseGroup(
  group: SettlementGroup<SettlementExpenseCategoryResponse>,
): SettlementGroup<SettlementExpenseCategory> {
  return {
    ...group,
    items: group.items.map((item) => ({
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
    previous_settlement: breakdown.previous_settlement,
    profit_loss: breakdown.profit_loss,
    expenses_issued: normalizeSettlementExpenseGroup(breakdown.expenses_issued),
    expenses_paid: normalizeSettlementExpenseGroup(breakdown.expenses_paid),
    payments_received: breakdown.payments_received,
    payments_made: breakdown.payments_made,
    payments_registered: breakdown.payments_registered,
    incomes_received: breakdown.incomes_received,
    salary: breakdown.salary,
    service_fee: breakdown.service_fee,
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
