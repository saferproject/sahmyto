"use client";

import { useEffect, useState } from "react";
import { Profile2User } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import PartnersListComponent from "./_components/partners-list-component";
import PartnersListButtonsComponent from "./_components/partners-list-buttons-component";
import PartnerFormDrawerComponent from "../_components/partner-form-drawer-component";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetPartnersEndpoint from "./_hooks/use-get-partners-endpoint";
import ListFooterLayout from "../_layouts/list-footer-layout";
import ListHeaderLayout from "../_layouts/list-header-layout";

export default function PartnersListPage() {
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

  const { data, isLoading, isError } = useGetPartnersEndpoint({ karboom_id });

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);

  const handleOpenDriverForm = () => {
    setDriverFormDrawerOpen(true);
  };

  const handleCloseDriverForm = () => {
    setDriverFormDrawerOpen(false);
  };

  return (
    <>
      <ListHeaderLayout title="لیست مالکین" />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data?.data.length}
      >
        <PartnersListComponent partners={data?.data ?? []} />
      </QueryState>
      <PartnerFormDrawerComponent
        isOpen={isDriverFormDrawerOpen}
        onOpen={handleOpenDriverForm}
        onClose={handleCloseDriverForm}
        onSuccess={handleCloseDriverForm}
      />
      <ListFooterLayout onAdd={handleOpenDriverForm} />
    </>
  );
}
