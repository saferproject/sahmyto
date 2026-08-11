import { AnimatePresence } from "motion/react";

import QueryState from "@/app/_components/query-state";
import useGetThirdPartyInsurancesEndpoint from "../_hooks/use-get-third-party-insurances-endpoint";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { ThirdPartyInsuranceListProps } from "../_types/third-party-insurance-list-props";
import ThirdPartyInsuranceListItemComponent from "../_components/third-party-insurance-list-item-component";
import InsuranceBannerComponent from "../../_components/insurance-banner-component";
import SelectedKarboomInfoComponent from "../../_components/selected-karboom-info-component";
import ListFooterLayout from "../../_layouts/list-footer-layout";

export default function ThirdPartyInsuranceListLayout({
  onOpenThirdPartyInsuranceForm,
}: ThirdPartyInsuranceListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: thirdPartyInsurances,
    isLoading,
    isError,
  } = useGetThirdPartyInsurancesEndpoint(karboomId);

  return (
    <>
      <InsuranceBannerComponent />
      <SelectedKarboomInfoComponent />
      <QueryState
        isLoading={isLoading}
        isError={isError}
        isEmpty={!thirdPartyInsurances?.data.length}
      >
        <ul className="flex w-full flex-col gap-4">
          <AnimatePresence>
            {thirdPartyInsurances?.data.map((thirdPartyInsurance, index) => (
              <ThirdPartyInsuranceListItemComponent
                key={thirdPartyInsurance.id}
                thirdPartyInsurance={thirdPartyInsurance}
                index={index}
              />
            ))}
          </AnimatePresence>
        </ul>
      </QueryState>
      <ListFooterLayout onAdd={onOpenThirdPartyInsuranceForm} />
    </>
  );
}
