import Partner from "../../../_types/partner";

type PartnersListProps = {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
};

export default PartnersListProps;
