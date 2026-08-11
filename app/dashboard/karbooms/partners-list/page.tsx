"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import PartnersListComponent from "./_components/partners-list-component";
import PartnerFormDrawerComponent from "../_components/partner-form-drawer-component";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import useGetPartnersEndpoint from "./_hooks/use-get-partners-endpoint";
import ListFooterLayout from "../_layouts/list-footer-layout";
import ListHeaderLayout from "../_layouts/list-header-layout";
import { FormStates } from "../../_types/form-states";
import Partner from "../_interfaces/partner";

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

  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] =
    useState<boolean>(false);
  const [partnerFormState, setPartnerFormState] = useState<FormStates>("ADD");
  const [selectedPartner, setSelectedPartner] = useState<Partner>();

  const handleOpenPartnerForm = () => {
    setPartnerFormState("ADD");
    setSelectedPartner(undefined);
    setPartnerFormDrawerOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setPartnerFormState("EDIT");
    setSelectedPartner(partner);
    setPartnerFormDrawerOpen(true);
  };

  const handleClosePartnerForm = () => {
    setPartnerFormDrawerOpen(false);
    setPartnerFormState("ADD");
    setSelectedPartner(undefined);
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
        <PartnersListComponent
          partners={data?.data ?? []}
          onEdit={handleEditPartner}
        />
      </QueryState>
      <PartnerFormDrawerComponent
        formState={partnerFormState}
        partner={selectedPartner}
        isOpen={isPartnerFormDrawerOpen}
        onOpen={handleOpenPartnerForm}
        onClose={handleClosePartnerForm}
        onSuccess={handleClosePartnerForm}
      />
      <ListFooterLayout onAdd={handleOpenPartnerForm} />
    </>
  );
}
