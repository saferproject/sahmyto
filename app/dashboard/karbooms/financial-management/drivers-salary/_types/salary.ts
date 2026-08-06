import { DriverSalaryTypes } from "./driver-salary-type";
import { SalaryTypes } from "./salary-types";

export type Salary = {
  id: number;
  income_id: number;
  driver_id: number;
  karboom_financial_id: number;
  amount: number;
  type: DriverSalaryTypes;
  salary_type: SalaryTypes;
  description: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
