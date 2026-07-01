"use client";

import { useEffect, useState } from "react";
import { Profile2User } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import PartnersListHeaderComponent from "./_components/partners-list-header-component";
import PartnersListComponent from "./_components/partners-list-component";
import PartnersListButtonsComponent from "./_components/partners-list-buttons-component";
import PartnerFormDrawerComponent from "../_components/partner-form-drawer-component";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetPartnersEndpoint from "./_hooks/use-get-partners-endpoint";

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
    <div className="mt-2 flex size-full flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <Profile2User className="text-heading" size={24} variant="Broken" />
          <h2 className="text-body text-xl font-bold">لیست شرکا</h2>
        </div>
        <PartnersListHeaderComponent partnersCount={data?.data.length ?? 0} />
        <SelectedKarboomInfoComponent />
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto">
          <QueryState
            isLoading={isLoading}
            isError={isError}
            isEmpty={!data?.data.length}
          >
            <PartnersListComponent partners={data?.data ?? []} />
          </QueryState>
        </div>
        <PartnerFormDrawerComponent
          isOpen={isDriverFormDrawerOpen}
          onOpen={handleOpenDriverForm}
          onClose={handleCloseDriverForm}
          onSuccess={handleCloseDriverForm}
        />
      </div>
      <PartnersListButtonsComponent onAddPartner={handleOpenDriverForm} />
    </div>
  );
}
