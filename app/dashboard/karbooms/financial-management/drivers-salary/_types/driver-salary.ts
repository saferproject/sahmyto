import User from "@/app/_interfaces/user";
import { Salary } from "./salary";

export type DriverSalary = User & {
  salaries: Salary[];
};
