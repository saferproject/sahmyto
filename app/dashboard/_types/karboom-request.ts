import Karboom from "@/app/_interfaces/karboom";
import User from "@/app/_interfaces/user";
import { MemberTypes } from "./member-types";
import { ActivityStatus } from "../karbooms/_types/activity-status";

export type KarboomRequest = {
  id: number;
  karboom: Karboom;
  sender: User;
  reciever: User;
  role_type: MemberTypes;
  status: ActivityStatus;
  time_ago: string;
};