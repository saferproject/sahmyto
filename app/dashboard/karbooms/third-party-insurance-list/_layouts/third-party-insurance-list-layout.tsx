import { AnimatePresence } from "motion/react";

import QueryState from "@/app/_components/query-state";
import useGetThirdPartyInsurancesEndpoint from "../_hooks/use-get-third-party-insurances-endpoint";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { ThirdPartyInsuranceListProps } from "../_types/third-party-insurance-list-props";
import ThirdPartyInsuranceListItemComponent from "../_components/third-party-insurance-list-item-component";
import ThirdPartyInsuranceListFooterLayout from "./third-party-insurance-list-footer-layout";

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
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pb-2">
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
      </div>
      <ThirdPartyInsuranceListFooterLayout
        onAddThirdPartyInsurance={onOpenThirdPartyInsuranceForm}
      />
    </div>
  );
}
