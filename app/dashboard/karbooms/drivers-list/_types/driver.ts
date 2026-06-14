import { Status } from "@/app/dashboard/_types/status";
import { ActivityStatus } from "../../_types/activity-status";
import { DriverPaymentTypes } from "./driver-payment-types";

export type Driver = {
  id: number;
  avatar: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  fixed_amount: number;
  percentage_amount: number;
  payment_type: DriverPaymentTypes;
  description: string | null;
  membership_status: ActivityStatus;
  status: Status;
};
