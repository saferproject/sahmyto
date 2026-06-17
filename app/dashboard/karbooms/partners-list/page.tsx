"use client";

import { useState } from "react";
import { Profile2User } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import PartnersListHeaderComponent from "./_components/partners-list-header-component";
import PartnersListComponent from "./_components/partners-list-component";
import PartnersListButtonsComponent from "./_components/partners-list-buttons-component";
import PartnerFormDrawerComponent from "../_components/partner-form-drawer-component";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetPartnersEndpoint from "./_hooks/use-get-partners-endpoint";

export default function PartnersListPage() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { id: karboom_id } = useKarboomsStore((state) => state);

  if (!karboom_id) {
    enqueueSnackbar({ variant: "warning", message: "کاربومی انتخاب نشده است" });
    router.replace("/dashboard/karbooms");
  }

  const { data } = useGetPartnersEndpoint({ karboom_id });

  const [isDriverFormDrawerOpen, setDriverFormDrawerOpen] =
    useState<boolean>(false);

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
          <Profile2User className="text-heading" size={24} variant="Broken" />
          <h2 className="text-body text-xl font-bold">افزودن شریک</h2>
        </div>
        <PartnersListHeaderComponent partnersCount={data?.data.length ?? 0} />
        <SelectedKarboomInfoComponent />
        <PartnersListComponent partners={data?.data ?? []} />
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
