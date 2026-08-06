import { Salary } from "../_types/salary";
import { SalaryTypes } from "../_types/salary-types";

export default function groupSalariesByType(
  salaries: Salary[],
): Record<SalaryTypes, Salary[]> {
  return salaries.reduce<Record<SalaryTypes, Salary[]>>(
    (groupedSalaries, salary) => {
      groupedSalaries[salary.salary_type].push(salary);

      return groupedSalaries;
    },
    {
      percentage: [],
      service: [],
      fixed: [],
    },
  );
}
