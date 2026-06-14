import KarboomListProps from "../_interfaces/karboom-list-props";
import KarboomListItemComponent from "./karboom-list-item-component";

export default function KarboomListComponent({ karbooms }: KarboomListProps) {
  return (
    <ul className="flex w-full flex-col gap-12 overflow-auto py-10">
      {karbooms.map((karboom, index) => (
        <KarboomListItemComponent {...karboom} key={karboom.id} index={index} />
      ))}
    </ul>
  );
}
