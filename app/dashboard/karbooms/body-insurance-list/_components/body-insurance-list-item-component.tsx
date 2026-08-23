import InsuranceListItemComponent from "../../_components/insurance-list-item-component";
import { BodyInsuranceListItemProps } from "../_types/body-insurance-list-item-props";

export default function BodyInsuranceListItemComponent({
  bodyInsurance,
  index,
}: BodyInsuranceListItemProps) {
  return <InsuranceListItemComponent insurance={bodyInsurance} index={index} />;
}
