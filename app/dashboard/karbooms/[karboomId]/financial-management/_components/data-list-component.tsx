import { DataListProps } from "../_types/data-list-props";
import DataListItemComponent from "./data-list-item-component";

export default function DataListComponent({ indent, items }: DataListProps) {
  return (
    <ul
      className={
        "mt-4 flex w-full flex-col gap-4 " + (indent ? "pr-4" : undefined)
      }
    >
      {items.map((item) => {
        const isIncome = "quantity" in item;
        const title = isIncome
          ? (item.receiver?.full_name ?? "")
          : (item.payer?.full_name ?? "");
        const value = isIncome
          ? item.unit_price * item.quantity
          : item.unit_price + item.wage_cost;

        return (
          <DataListItemComponent key={item.id} title={title} value={value} />
        );
      })}
    </ul>
  );
}
