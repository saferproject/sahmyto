import { Activity } from "./activity";

export type ActivityListItemProps = {
  activity: Activity;
  index: number;
  onEdit: (activity: Activity) => void;
};