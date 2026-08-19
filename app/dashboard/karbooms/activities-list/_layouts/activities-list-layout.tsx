"use client";

import { AnimatePresence } from "motion/react";
import { ActivitiesListLayoutProps } from "../_types/activities-list-layout-props";
import ActivityListItemComponent from "../_components/activity-list-item-component";

export default function ActivitiesListLayout({
  activities,
  onEdit,
}: ActivitiesListLayoutProps) {
  return (
    <ul className="flex w-full flex-col gap-8 pt-4">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <ActivityListItemComponent
            key={activity.id}
            activity={activity}
            index={index}
            onEdit={onEdit}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
}
