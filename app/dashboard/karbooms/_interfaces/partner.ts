import { ActivityStatus } from "../_types/activity-status";

export default interface Partner {
  id: number;
  avatar: string | null;
  status: ActivityStatus;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  share: number | null;
  description: string;
}
