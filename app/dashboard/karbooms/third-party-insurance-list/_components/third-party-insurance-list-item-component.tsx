import InsuranceListItemComponent from "../../_components/insurance-list-item-component";
import { ThirdPartyInsuranceListItemProps } from "../_types/third-party-insurance-list-item-props";

export default function ThirdPartyInsuranceListItemComponent({
  thirdPartyInsurance,
  index,
}: ThirdPartyInsuranceListItemProps) {
  return (
    <InsuranceListItemComponent insurance={thirdPartyInsurance} index={index} />
  );
}
