import QueryState from "@/app/_components/query-state";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";
import { AnimatePresence } from "motion/react";
import useGetBodyInsurancesEndpoint from "../_hooks/use-get-body-insurances-endpoint";
import BodyInsuranceListItemComponent from "../_components/body-insurance-list-item-component";
import BodyInsuranceListFooterLayout from "./body-insurance-list-footer-layout";
import { BodyInsuranceListProps } from "../_types/body-insurance-list-props";

export default function BodyInsuranceListLayout({
  onOpenBodyInsuranceForm,
}: BodyInsuranceListProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: bodyInsurances,
    isLoading,
    isError,
  } = useGetBodyInsurancesEndpoint(karboomId);

  return (
    <div className="mt-4 flex min-h-0 w-full flex-1 flex-col gap-4">
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto pb-2">
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
        </QueryState>
      </div>
      <BodyInsuranceListFooterLayout
        onAddBodyInsurance={onOpenBodyInsuranceForm}
      />
    </div>
  );
}