import PartnersListProps from "../_interfaces/partners-list-props";
import PartnersListItemComponent from "./partners-list-item-component";

export default function PartnersListComponent({ partners }: PartnersListProps) {
  return (
    <ul className="mt-4 flex w-full flex-col gap-6 overflow-y-auto overflow-x-hidden py-4">
      {partners.map((partner) => (
        <PartnersListItemComponent key={partner.id} item={partner} />
      ))}
    </ul>
  );
}
