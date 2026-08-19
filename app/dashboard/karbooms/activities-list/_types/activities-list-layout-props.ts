import { Activity } from "./activity";

export type ActivitiesListLayoutProps = {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
};