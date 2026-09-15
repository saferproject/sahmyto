import User from "@/app/_types/user";
import { Salary } from "./salary";

export type DriverSalary = User & {
  salaries: Salary[];
};
