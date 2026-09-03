import type { Expense } from "../../_types/expense";
import type { Income } from "../../_types/income";
import type { FinancialMonthData } from "../_types/financial-month-data";

export function getIncomeTotal(incomes: Income[] = []) {
  return incomes.reduce(
    (total, income) => total + income.unit_price * income.quantity,
    0,
  );
}

export function getExpenseTotal(expenses: Expense[] = []) {
  return expenses.reduce(
    (total, expense) => total + expense.unit_price + expense.wage_cost,
    0,
  );
}

export function getDailyExpenseTotal(expenses: Expense[] = []) {
  return expenses.reduce((total, expense) => total + expense.unit_price, 0);
}

export default function createFinancialMonthSummary(
  financialMonth?: FinancialMonthData,
) {
  const incomes = financialMonth?.incomes ?? [];
  const expenses = financialMonth?.expenses ?? [];
  const incomesByType = Object.groupBy(incomes, (income) => income.type);
  const expensesByType = Object.groupBy(expenses, (expense) => expense.type);

  return {
    totalIncome: getIncomeTotal(incomes),
    totalExpense: getExpenseTotal(expenses),
    incomesByType,
    expensesByType,
    dailyExpensesByCategory: Object.groupBy(
      expensesByType.daily ?? [],
      (expense) => expense.category,
    ),
    repairExpensesByCategory: Object.groupBy(
      expensesByType.repair ?? [],
      (expense) => expense.category,
    ),
  };
}

export type FinancialMonthSummary = ReturnType<
  typeof createFinancialMonthSummary
>;
