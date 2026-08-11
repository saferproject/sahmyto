import Partner from "../../_interfaces/partner";

export default interface PartnersListProps {
  partners: Partner[];
  onEdit: (partner: Partner) => void;
}
