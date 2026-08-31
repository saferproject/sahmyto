"use client";

import { useState } from "react";

import BodyInsuranceDrawerComponent from "./_components/body-insurance-drawer-component";
import ListFooterLayout from "../_layouts/list-footer-layout";
import ListHeaderLayout from "../_layouts/list-header-layout";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import useGetBodyInsurancesEndpoint from "./_hooks/use-get-body-insurances-endpoint";
import InsuranceBannerComponent from "../_components/insurance-banner-component";
import SelectedKarboomInfoComponent from "../_components/selected-karboom-info-component";
import QueryState from "@/app/_components/query-state";
import { AnimatePresence } from "motion/react";
import BodyInsuranceListItemComponent from "./_components/body-insurance-list-item-component";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function BodyInsurancePage() {
  const [isBodyInsuranceFormDrawerOpen, setBodyInsuranceFormDrawerOpen] =
    useState<boolean>(false);

  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: bodyInsurances,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetBodyInsurancesEndpoint(karboomId);

  const handleOpenBodyInsuranceForm = () => {
    setBodyInsuranceFormDrawerOpen(true);
  };

  const handleCloseBodyInsuranceForm = () => {
    setBodyInsuranceFormDrawerOpen(false);
  };

  return (
    <>
      <ListHeaderLayout title="لیست بیمه بدنه" />
      <InsuranceBannerComponent />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!bodyInsurances?.data.length}
      >
        <ul className="flex w-full flex-col gap-4">
          <AnimatePresence>
            {bodyInsurances?.data.map((thirdPartyInsurance, index) => (
              <BodyInsuranceListItemComponent
                key={thirdPartyInsurance.id}
                bodyInsurance={thirdPartyInsurance}
                index={index}
              />
            ))}
          </AnimatePresence>
        </ul>
        <InfiniteScrollTrigger
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      </QueryState>
      <ListFooterLayout onAdd={handleOpenBodyInsuranceForm} />
      <BodyInsuranceDrawerComponent
        isOpen={isBodyInsuranceFormDrawerOpen}
        onOpen={handleOpenBodyInsuranceForm}
        onClose={handleCloseBodyInsuranceForm}
      />
    </>
  );
}

/*

*/
