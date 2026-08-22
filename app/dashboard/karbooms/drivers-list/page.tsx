"use client";

import { useState } from "react";

import { useSnackbar } from "notistack";

import DriversListComponent from "./_components/drivers-list-component";
import DriverFormDrawerComponent from "../_components/driver-form-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetDriversEndpoint from "./_hooks/use-get-karboom-drivers-endpoint";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";
import ListFooterLayout from "../_layouts/list-footer-layout";
import ListHeaderLayout from "../_layouts/list-header-layout";
import type { FormStates } from "../../_types/form-states";
import type { Driver } from "./_types/driver";
import { useShallow } from "zustand/react/shallow";

export default function DriverListPage() {
  const { enqueueSnackbar } = useSnackbar();

  const { karboomId, karboomRoles } = useKarboomsStore(
    useShallow(({ id: karboomId, roles: karboomRoles }) => ({
      karboomId,
      karboomRoles,
    })),
  );

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);
  const [driverFormState, setDriverFormState] = useState<FormStates>("ADD");
  const [selectedDriver, setSelectedDriver] = useState<Driver>();

  const { data, isLoading, isError } = useGetDriversEndpoint(karboomId);

  const handleOpenDriverForm = () => {
    if (karboomRoles.includes("owner")) {
      setDriverFormState("ADD");
      setSelectedDriver(undefined);
      setDriverFormDrawerOpen(true);
    } else
      enqueueSnackbar({
        variant: "warning",
        message: "فقط سازنده کاربوم می تواند راننده دعوت کند",
      });
  };

  const handleEditDriver = (driver: Driver) => {
    if (karboomRoles.includes("owner")) {
      setDriverFormState("EDIT");
      setSelectedDriver(driver);
      setDriverFormDrawerOpen(true);
    } else
      enqueueSnackbar({
        variant: "warning",
        message: "فقط سازنده کاربوم می تواند راننده ویرایش کند",
      });
  };

  const handleCloseDriverForm = () => {
    setDriverFormDrawerOpen(false);
    setDriverFormState("ADD");
    setSelectedDriver(undefined);
  };

  return (
    <>
      <ListHeaderLayout title="لیست رانندگان" />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data?.data.length}
      >
        <DriversListComponent
          drivers={data?.data ?? []}
          onEdit={handleEditDriver}
        />
      </QueryState>
      <DriverFormDrawerComponent
        formState={driverFormState}
        driver={selectedDriver}
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverForm}
        onClose={handleCloseDriverForm}
        onSuccess={handleCloseDriverForm}
      />
      <ListFooterLayout onAdd={handleOpenDriverForm} />
    </>
  );
}
