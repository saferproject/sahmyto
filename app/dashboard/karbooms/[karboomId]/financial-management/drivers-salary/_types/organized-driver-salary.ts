import type User from "@/app/_types/user";
import type { SalaryTypes } from "./salary-types";
import type { Salary } from "./salary";

export type OrganizedDriverSalary = User & {
  salaries: Record<SalaryTypes, Salary[]>;
  bonuses: Salary[];
  penalties: Salary[];
};
