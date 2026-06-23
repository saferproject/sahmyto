"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { User } from "iconsax-reactjs";

import { useSnackbar } from "notistack";

import DriversListComponent from "./_components/drivers-list-component";
import DriversListHeaderComponent from "./_components/drivers-list-header-component";
import DriversListButtonsComponent from "./_components/drivers-list-buttons-component";
import DriverFormDrawerComponent from "../_components/driver-form-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetDriversEndpoint from "./_hooks/use-get-karboom-drivers-endpoint";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";

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

  const { data, isLoading, isError } = useGetDriversEndpoint(karboom_id);

  const handleOpenDriverForm = () => {
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverForm = () => {
    setDriverFormDrawerOpen(false);
  };

  return (
    <div className="mt-2 flex size-full flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <User className="text-heading" size={24} variant="Broken" />
          <h2 className="text-body text-xl font-bold">رانندگان</h2>
        </div>
        <DriversListHeaderComponent driversCount={data?.data.length ?? 0} />
        <SelectedKarboomInfoComponent />
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
          <QueryState
            isLoading={isLoading}
            isError={isError}
            isEmpty={!data?.data.length}
          >
            <DriversListComponent drivers={data?.data ?? []} />
          </QueryState>
        </div>
        <DriverFormDrawerComponent
          isOpen={isDriverFormDrawerOpen}
          onOpen={handleOpenDriverForm}
          onClose={handleCloseDriverForm}
          onSuccess={handleCloseDriverForm}
        />
      </div>
      <DriversListButtonsComponent onAddDriver={handleOpenDriverForm} />
    </div>
  );
}
