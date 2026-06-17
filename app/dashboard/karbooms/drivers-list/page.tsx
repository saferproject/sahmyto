"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { User } from "iconsax-reactjs";

import { useSnackbar } from "notistack";

import DriversListComponent from "./_components/drivers-list-component";
import DriversListHeaderComponent from "./_components/drivers-list-header-component";
import DriversListButtonsComponent from "./_components/drivers-list-buttons-component";
import DriverFormDrawerComponent from "../_components/driver-form-drawer-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetDriversEndpoint from "./_hooks/use-get-karboom-drivers-endpoint";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";

export default function DriverListPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id: karboom_id } = useKarboomsStore((state) => state);

  if (!karboom_id) {
    enqueueSnackbar({ variant: "warning", message: "کاربومی انتخاب نشده است" });
    router.replace("/dashboard/karbooms");
  }

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);

  const { data } = useGetDriversEndpoint(karboom_id);

  const handleOpenDriverForm = () => {
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverForm = () => {
    setDriverFormDrawerOpen(false);
  };

  return (
    <div className="relative mt-2 flex size-full flex-col">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <User className="text-heading" size={24} variant="Broken" />
          <h2 className="text-body text-xl font-bold">رانندگان</h2>
        </div>
        <DriversListHeaderComponent driversCount={data?.data.length ?? 0} />
        <SelectedKarboomInfoComponent />
        <DriversListComponent drivers={data?.data ?? []} />
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
