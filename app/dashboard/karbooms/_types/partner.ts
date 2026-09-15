import { ActivityStatus } from "../_types/activity-status";

type Partner = {
  id: number;
  avatar: string | null;
  status: ActivityStatus;
  first_name: string;
  last_name: string;
  full_name: string;
  phone: string;
  share: number;
  description: string;
};

export default Partner;
