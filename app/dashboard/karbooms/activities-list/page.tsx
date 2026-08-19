"use client";

import { useState } from "react";

import QueryState from "@/app/_components/query-state";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import ListFooterLayout from "../_layouts/list-footer-layout";
import ListHeaderLayout from "../_layouts/list-header-layout";
import ActivitiesListBannerComponent from "./_components/activities-list-banner-component";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { FormStates } from "../../_types/form-states";
import { Activity } from "./_types/activity";
import useGetActivitiesEndpoint from "./_hooks/use-get-activities-endpoint";
import ActivitiesListLayout from "./_layouts/activities-list-layout";
import ActivityFormDrawerComponent from "./_components/activity-form-drawer-component";

export default function ActivitiesListPage() {
  const karboomId = useKarboomsStore((state) => state.id);

  const [isActivityFormDrawerOpen, setActivityFormDrawerOpen] =
    useState<boolean>(false);
  const [activityFormState, setActivityFormState] = useState<FormStates>("ADD");
  const [selectedActivity, setSelectedActivity] = useState<Activity>();

  const { data, isLoading, isError } = useGetActivitiesEndpoint(karboomId);

  const handleOpenActivityForm = () => {
    setActivityFormState("ADD");
    setSelectedActivity(undefined);
    setActivityFormDrawerOpen(true);
  };

  const handleEditActivity = (activity: Activity) => {
    setActivityFormState("EDIT");
    setSelectedActivity(activity);
    setActivityFormDrawerOpen(true);
  };

  const handleCloseActivityForm = () => {
    setActivityFormDrawerOpen(false);
    setActivityFormState("ADD");
    setSelectedActivity(undefined);
  };

  return (
    <>
      <ListHeaderLayout title="لیست فعالیت ها" />
      <ActivitiesListBannerComponent />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data?.data.length}
      >
        <ActivitiesListLayout
          activities={data?.data ?? []}
          onEdit={handleEditActivity}
        />
      </QueryState>
      <ActivityFormDrawerComponent
        formState={activityFormState}
        activity={selectedActivity}
        isOpen={isActivityFormDrawerOpen}
        onOpen={handleOpenActivityForm}
        onClose={handleCloseActivityForm}
        onSuccess={handleCloseActivityForm}
      />
      <ListFooterLayout onAdd={handleOpenActivityForm} />
    </>
  );
}
