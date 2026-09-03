import Karboom from "@/app/_interfaces/karboom";
import User from "@/app/_interfaces/user";
import { ActivityStatus } from "../karbooms/_types/activity-status";
import { DriverPaymentTypes } from "../karbooms/drivers-list/_types/driver-payment-types";

export type KarboomRequest =
  | {
      id: number;
      karboom: Karboom;
      sender: User;
      reciever: User;
      role_type: "partner";
      status: ActivityStatus;
      time_ago: string;
      info: {
        share: number;
      };
    }
  | {
      id: number;
      karboom: Karboom;
      sender: User;
      reciever: User;
      role_type: "driver";
      status: ActivityStatus;
      time_ago: string;
      info: {
        fixed_amount: number;
        payment_type: DriverPaymentTypes;
        percentage_amount: number;
        service_amount: number;
      };
    };
