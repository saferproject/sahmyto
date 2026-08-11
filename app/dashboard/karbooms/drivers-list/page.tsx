"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

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

export default function DriverListPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id: karboom_id } = useKarboomsStore((state) => state);

  useEffect(() => {
    if (!karboom_id) {
      enqueueSnackbar({
        variant: "warning",
        message: "کاربومی انتخاب نشده است",
      });
      router.replace("/dashboard/karbooms");
    }
  }, [karboom_id, enqueueSnackbar, router]);

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);
  const [driverFormState, setDriverFormState] = useState<FormStates>("ADD");
  const [selectedDriver, setSelectedDriver] = useState<Driver>();

  const { data, isLoading, isError } = useGetDriversEndpoint(karboom_id);

  const handleOpenDriverForm = () => {
    setDriverFormState("ADD");
    setSelectedDriver(undefined);
    setDriverFormDrawerOpen(true);
  };

  const handleEditDriver = (driver: Driver) => {
    setDriverFormState("EDIT");
    setSelectedDriver(driver);
    setDriverFormDrawerOpen(true);
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
