import type { DriverSalary } from "../_types/driver-salary";
import type { OrganizedDriverSalary } from "../_types/organized-driver-salary";
import groupSalariesByType from "./group-salaries-by-type";

export default function organizeDriverSalary({
  salaries,
  ...driver
}: DriverSalary): OrganizedDriverSalary {
  const baseSalaries = salaries.filter(({ type }) => type === "salary");

  return {
    ...driver,
    salaries: groupSalariesByType(baseSalaries),
    bonuses: salaries.filter(({ type }) => type === "bonus"),
    penalties: salaries.filter(({ type }) => type === "penalty"),
  };
}
