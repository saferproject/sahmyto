import type { Salary } from "../_types/salary";

export default function sumSalaryAmounts(salaries: Salary[]): number {
  return salaries.reduce((total, salary) => total + salary.amount, 0);
}
