import { IncomeFormType } from "../_schemas/income-form-schema";
import { IncomeTypes } from "./income-categories";

export type CreateIncomeBody = {
  karboom_id: number;
  receiver_id: number;
  started_at: string;
  type: IncomeTypes;
  ended_at: string;
} & Omit<IncomeFormType, "reciever" | "image" | "started_at" | "ended_at">;
