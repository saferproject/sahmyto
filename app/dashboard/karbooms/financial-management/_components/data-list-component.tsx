import { DataListProps } from "../_types/data-list-props";
import DataListItemComponent from "./data-list-item-component";

export default function DataListComponent({ indent, items }: DataListProps) {
  return (
    <ul
      className={
        "mt-4 flex w-full flex-col gap-4 " + (indent ? "pr-4" : undefined)
      }
    >
      {items.map((item) => (
        <DataListItemComponent title={} />
      ))}
    </ul>
  );
}
