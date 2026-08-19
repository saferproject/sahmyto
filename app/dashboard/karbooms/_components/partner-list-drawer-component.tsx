"use client";

import FormDrawerComponent from "@/app/_components/form-drawer-component";
import { PartnerListDrawerProps } from "../_types/partner-list-drawer-props";
import PartnersListComponent from "../partners-list/_components/partners-list-component";
import QueryState from "@/app/_components/query-state";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { useShallow } from "zustand/react/shallow";
import useGetPartnersEndpoint from "../partners-list/_hooks/use-get-partners-endpoint";
import ListFooterLayout from "../_layouts/list-footer-layout";
import PartnerFormDrawerComponent from "./partner-form-drawer-component";
import { useEffect, useState } from "react";
import { FormStates } from "../../_types/form-states";
import Partner from "../_interfaces/partner";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

export default function PartnerListDrawerComponent({
  isOpen,
  onOpen,
  onClose,
  onSkip,
}: PartnerListDrawerProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const karboomId = useKarboomsStore((state) => state.id);

  const [isPartnerFormDrawerOpen, setPartnerFormDrawerOpen] =
    useState<boolean>(false);
  const [partnerFormState, setPartnerFormState] = useState<FormStates>("ADD");
  const [selectedPartner, setSelectedPartner] = useState<Partner | undefined>();

  const {
    data: partners,
    isLoading: gettingPartners,
    isError: gettingPartnersFailed,
  } = useGetPartnersEndpoint({
    karboom_id: karboomId,
  });

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

  useEffect(() => {
    if (!karboomId) {
      enqueueSnackbar({
        variant: "warning",
        message: "کاربومی انتخاب نشده است",
      });
      router.replace("/dashboard/karbooms");
    }
  }, [karboomId, enqueueSnackbar, router]);

  return (
    <FormDrawerComponent isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <h4 className="text-body text-lg font-bold">لیست مالکین</h4>
      <QueryState
        isLoading={gettingPartners}
        isError={gettingPartnersFailed}
        isEmpty={!partners?.data.length}
      >
        <PartnersListComponent
          partners={partners?.data ?? []}
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
      <Button
        variant="outlined"
        onClick={onSkip}
        sx={{
          marginTop: '8px',
        }}
        fullWidth
      >
        رد کردن
      </Button>
    </FormDrawerComponent>
  );
}
