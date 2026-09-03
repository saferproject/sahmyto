import type Karboom from "@/app/_interfaces/karboom";
import type User from "@/app/_interfaces/user";
import type { Expense } from "../../_types/expense";
import type { ExpenseCategory } from "../../_types/expense-category";
import type { Income } from "../../_types/income";
import type { Payment } from "../../payments-list/_types/payment";
import type { DriverSalary } from "../drivers-salary/_types/driver-salary";
import type { Salary } from "../drivers-salary/_types/salary";

type SettlementParticipant = {
  id: number;
  user_id: User["id"];
  name: NonNullable<User["full_name"]>;
};

export type SettlementMember = {
  karboom_member_id: number;
  name: NonNullable<DriverSalary["full_name"]>;
  is_driver: boolean;
};

export type SettlementGroup<T> = {
  total: number;
  items: T[];
};

type SettlementBalanceItem = {
  type: "profit" | "loss" | "settled";
  amount: number;
};

type SettlementExpenseResponse = Pick<
  Expense,
  "id" | "unit_price" | "wage_cost" | "type" | "description" | "date"
> & {
  total_price: number;
  category_id: number;
  sender: SettlementParticipant;
  payer: SettlementParticipant;
};

type SettlementExpense = SettlementExpenseResponse & {
  category_name: ExpenseCategory["name"];
};

export type SettlementExpenseCategoryResponse = {
  category: Pick<ExpenseCategory, "id" | "name" | "type" | "status">;
  expenses: SettlementExpenseResponse[];
  total: number;
};

export type SettlementExpenseCategory = Omit<
  SettlementExpenseCategoryResponse,
  "expenses"
> & {
  expenses: SettlementExpense[];
};

type SettlementPayment = Pick<
  Payment,
  "id" | "total_price" | "type" | "description"
> & {
  created_at: string;
  payer: SettlementParticipant;
  receiver: SettlementParticipant;
  registered_by: SettlementParticipant;
};

type SettlementIncome = Pick<
  Income,
  | "id"
  | "quantity"
  | "unit_price"
  | "type"
  | "description"
  | "started_at"
  | "ended_at"
> & {
  total_price: number;
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
};

type SettlementSalary = Pick<
  Salary,
  "id" | "amount" | "type" | "description"
> & {
  income_id: Salary["income_id"] | null;
  effect_amount: number;
  salary_type: Salary["salary_type"] | null;
};

export type SettlementBreakdown = {
  previous_settlement: SettlementGroup<unknown>;
  profit_loss: SettlementGroup<SettlementBalanceItem>;
  expenses_issued: SettlementGroup<SettlementExpenseCategory>;
  expenses_paid: SettlementGroup<SettlementExpenseCategory>;
  payments_received: SettlementGroup<SettlementPayment>;
  payments_made: SettlementGroup<SettlementPayment>;
  payments_registered: SettlementGroup<SettlementPayment>;
  incomes_received: SettlementGroup<SettlementIncome>;
  salary: SettlementGroup<SettlementSalary>;
  service_fee: SettlementGroup<unknown>;
};

export type SettlementBreakdownResponse = {
  previous_settlement: SettlementGroup<unknown>;
  profit_loss: SettlementGroup<SettlementBalanceItem>;
  expenses_issued: SettlementGroup<SettlementExpenseCategoryResponse>;
  expenses_paid: SettlementGroup<SettlementExpenseCategoryResponse>;
  payments_received: SettlementGroup<SettlementPayment>;
  payments_made: SettlementGroup<SettlementPayment>;
  payments_registered: SettlementGroup<SettlementPayment>;
  incomes_received: SettlementGroup<SettlementIncome>;
  salary: SettlementGroup<SettlementSalary>;
  service_fee: SettlementGroup<unknown>;
};

export type SettlementMemberData = SettlementMember & {
  id: number;
  opening_balance: number;
  share: number;
  salary: number;
  service_fee: number;
  income_held: number;
  expense_credit: number;
  payments_in: number;
  payments_out: number;
  balance: number;
  total: number;
  status: "creditor" | "debtor" | "settled";
  breakdown: SettlementBreakdown;
};

export type SettlementData = {
  total_income: Karboom["income"];
  total_expense: Karboom["expense"];
  total_salaries: number;
  total_service_fees: number;
  total_driver_compensation: number;
  total_opening_credit: number;
  total_opening_debt: number;
  previous_month: null;
  net: number;
  total_credit: number;
  total_debt: number;
  members: SettlementMemberData[];
};

export type SettlementDataResponse = Omit<SettlementData, "members"> & {
  members: Array<
    Omit<SettlementMemberData, "breakdown"> & {
      breakdown: SettlementBreakdownResponse;
    }
  >;
};
