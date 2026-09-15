import Partner from "../../../_types/partner";

type PartnersListItemProps = {
  item: Partner;
  index: number;
  onEdit: (partner: Partner) => void;
};

export default PartnersListItemProps;
