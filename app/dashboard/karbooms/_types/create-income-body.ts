import { IncomeFormType } from "../_schemas/income-form-schema";
import { IncomeTypes } from "./income-categories";

export type CreateIncomeBody = {
  karboom_id: number;
  receiver_id: number;
  started_at: string;
  type: IncomeTypes;
  ended_at: string;
  unit_price: number;
  total_price: number;
} & Omit<
  IncomeFormType,
  | "reciever"
  | "image"
  | "started_at"
  | "ended_at"
  | "unit_price"
  | "total_price"
>;
